---
title: Playing with Tables in Postgres
date: 2024-07-09T14:53:58+05:30
tags: ["posts", "postgres"]
---

## Introduction

Inspired by [unlogged](https://www.crunchydata.com/blog/postgresl-unlogged-tables) tables, I set out to do some experiments on them. This post details the learnings, and some questions around it I still have.

## Problem at hand

We want to see how Postgres behaves with respect to a `UNLOGGED` table. TL/DR from the above post is as follows:

> [!success] Pros for an `UNLOGGED` table. We'll discuss the first point here.
>
> 1. Massive improvements to write performance (as seen below).
> 2. Less vacuum impact (because vacuum changes are writes that also end up in the WAL stream).
> 3. Less total WAL (leading to less traffic, smaller backups, etc.)

> [!failure] Pros for an `UNLOGGED` table. We'll discuss the first point here.
>
> 1. Tables are truncated on crash recovery. No durability!.
> 2. Unlogged tables can only be accessed on the primary, not on the REPLicas.
> 3. Unlogged tables can NOT be used in logical REPLication, or physical backups.

## The experiment

The above post inspired me to do this experiment. I created a simple table and then load `10^x` records into it.
The things that I sought out to measure was

1. Time taken for the insertions
2. Table size in the database
3. Do the above with various settings `UNLOGGED` and `VACUUM [FULL]`, etc

## The table

Please read through the inline comments as we do a REPL here.

```sql
CREATE TABLE COLORS (ID SERIAL, NAME TEXT);

-- Let's see how much size our columns take

> select pg_column_size('a'::text);
 pg_column_size
----------------
              5
(1 row)
> select pg_column_size('abcdefghi'::text);
 pg_column_size
----------------
             13
(1 row)

> select pg_column_size(12121212::bigint);
 pg_column_size
----------------
              8
(1 row)

-- Ok, so a 8+13=20 bytes for storing a worst case scenario for our experiment.
-- Lets see how much size is required for storing the number and the text as a row.

> select pg_column_size((12121212::bigint,'abcdeefgh'::text));
 pg_column_size
----------------
             42
(1 row)

-- An additional 24 bytes since PG takes about 20 bytes for storing a row:
> select pg_column_size((NULL::bigint,NULL::text));
 pg_column_size
----------------
             24
(1 row)

```

Ok, that leaves us with `42`, the Answer to the Ultimate Question of Life, the Universe and Everything!

## Insert some rows

```javascript
import pgPromise from "pg-promise";
import { exit } from "process";

const initOptions = {};
const pgp = pgPromise(initOptions);
const db = pgp("postgresql://postgres@172.17.0.1:5451/ow_jobs?schema=public");

async function loadDatabase(seq: number) {
  await executeMassiveInserts(seq);
}

function executeMassiveInserts(seq: number) {
  // Generating 10,000 records 1000 times, for the total of 10 million records:
  const times = 1000;
  function getNextData(t: pgPromise.ITask<{}>, pageIndex: number, seq: number) {
    let data: { name: string }[] | undefined = undefined;
    console.log({ pageIndex });

    if (pageIndex < times) {
      data = [];
      for (let i = 0; i < 10000; i++) {
        const idx = pageIndex * 10000 + i; // to insert unique product names
        data.push({
          name: `product-${seq}`,
        });
      }
    }
    return Promise.resolve(data);
  }
  const columnSet = new pgp.helpers.ColumnSet([{ name: "name" }], {
    table: { table: "colors", schema: "public" },
  });
  return db
    .tx("massive-insert", (t) => {
      const processData = (data: { name: string }[] | undefined) => {
        if (data) {
          const insert = pgp.helpers.insert(data, columnSet);
          return t.none(insert);
        }
      };
      return t.sequence((index) =>
        getNextData(t, index, seq).then(processData)
      );
    })
    .then((data) => {
      // COMMIT has been executed
      console.log("Duration:", data.duration);
    })
    .catch((error) => {
      // ROLLBACK has been executed
      console.log(error);
    });
}
```

> [!note] Some points on the above code
>
> - The above code is taken verbatim from the [pgPromise](https://github.com/vitaly-t/pg-promise/wiki/Data-Imports) library.
> - Note the `executeMassiveInserts::times` constant above.
> - We use the above program with this driver code.
> - The idea is two use many parallel interleaving calls to the driver function above so we can create **multiple batches** of inserts

```javascript
Promise.all([loadDatabase(1)]).then(() => {
  exit(0);
});
```

## Estimations

```javascript
> bytesPerRow = 42;
> times = 1000;
1000
> totalRows= 10000 * times
10000000
> totalBytes = totalRows * bytesPerRow
420000000
> totalMbytes = totalBytes/1024/1024
400.543212890625
```

So by our (rudimentary/back of the envelope/me-not-an-expert-in-this|<insert-your-disclaimer>) calculations, it'd take around 400 MB for the rows. Lets see how much PG takes!

```sh
$ run-above-script.sh
....
{ pageIndex: 1000 }
Duration: 70332
Done in 71.46s.
```

```sql
> select pg_size_pretty(pg_table_size('colors'));
 pg_size_pretty
----------------
 422 MB

-- ;Not bad! We are off by around 20 MB.
> vacuum  full colors;
VACUUM

> select pg_size_pretty(pg_table_size('colors'));
 pg_size_pretty
----------------
 422 MB
(1 row)

-- A new table is already compacted. Let's make the table dirty!

> update colors set name=name;
UPDATE 10000000

> select pg_size_pretty(pg_table_size('colors'));
 pg_size_pretty
----------------
 845 MB
(1 row)

-- Look ma, I doubled it!
```

That's bloated for sure. A check up on Postgres manual for `VACUUM`:

> In PostgreSQL, an UPDATE or DELETE of a row does not immediately remove the old version of the row. This approach is necessary to gain the benefits of multi-version concurrency control (MVCC, see Chapter 13): the row version must not be deleted while it is still potentially visible to other transactions. But eventually, an outdated or deleted row version is no longer of interest to any transaction. The space it occupies must then be reclaimed for reuse by new rows, to avoid unbounded growth of disk space requirements. This is done by running VACUUM.

> The standard form of VACUUM removes dead row versions in tables and indexes and marks the space available for future reuse. However, **it will not return the space to the operating system**, except in the special case where one or more pages at the end of a table become entirely free and an exclusive table lock can be easily obtained.

> In contrast, VACUUM FULL actively compacts tables by writing a complete new version of the table file with no dead space. This minimizes the size of the table, but can take a long time. It also requires extra disk space for the new copy of the table, until the operation completes.

```sql
> vacuum   colors;
VACUUM
> select pg_size_pretty(pg_table_size('colors'));
 pg_size_pretty
----------------
 845 MB
(1 row)

> vacuum  VERBOSE ANALYZE colors;
INFO:  vacuuming "public.colors"
INFO:  "colors": found 0 removable, 20 nonremovable row versions in 1 out of 108109 pages
DETAIL:  0 dead row versions cannot be removed yet, oldest xmin: 647682
There were 0 unused item identifiers.
Skipped 0 pages due to buffer pins, 54054 frozen pages.
0 pages are entirely empty.
CPU: user: 0.00 s, system: 0.00 s, elapsed: 0.00 s.

```

I have `¯\_(o)_/¯` no idea what that means on the verbose analyze output. Left
as an exercise to the reader! But it is pretty clear that PG does what it says
on the tin: `..VACUUM will not return the space to the operating system`

```sql
> VACUUM full colors;
VACUUM
-- ^ this took longer time than the non-fuller one!
> select pg_size_pretty(pg_table_size('colors'));
 pg_size_pretty
----------------
 422 MB
(1 row)
```

...and we are back to familiar territory with a`FULL` vacuum. Thats what they
call deep cleaning!

## UNLOGGED Tables

```sql
CREATE TABLE COLORS (ID SERIAL, NAME TEXT);
```

So with an unlogged table, do we expect the size to be smaller? I thought so, since the post verified that updates

| Type         | Narration       | Value Dat                                                                          |
| ------------ | --------------- | ---------------------------------------------------------------------------------- |
| `UNLOGGED`   | insertion       | Takes around the same time                                                         |
| `UNLOGGED`   | update all rows | 9513.656 ms. with respect to table size, it took the same size as the logged table |
| normal table | update all rows | 27466.661 ms                                                                       |

So, as mentioned on the referenced blog, the performance times for the updates
are roughly 3 times better for an unlogged table.

## End

Thats the end of story for now. Except that I have a pop quiz for the interested
reader. Next steps is to read and grok: [Just Use Postgres
](https://www.amazingcto.com/postgres-for-everything/)

```javascript
Promise.all([loadDatabase(1), loadDatabase(2)]).then(() => {
  exit(0);
});
```

If you note the row generation scripts, you can see that the `colors.name`
column is provided a value of `product-${seq}`. The `seq` is the number we pass
on the `loadDatabase` call above.

So the question is, after the bulk rows are created as per the script block
above, what will be the order of the rows created?

### Is it A:

| id                | name      |
| ----------------- | --------- |
| 4185441           | product-1 |
| 4185442           | product-1 |
| 4185443           | product-1 |
| ....10^6 times .. |
| xxxxxx4           | product-2 |
| xxxxxx5           | product-2 |
| xxxxxx6           | product-2 |
| ....10^6 times .. |

### or Option B:

| id                | name      |
| ----------------- | --------- |
| 4185441           | product-1 |
| 4185442           | product-2 |
| 4185443           | product-1 |
| 4185444           | product-1 |
| 4185445           | product-2 |
| 4185446           | product-2 |
| ....10^6 times .. |           |
| ....10^6 times .. |           |

