---
title: Configuring Postgres on Ubuntu
date: 2024-07-14T10:09:47+05:30
tags: ["posts", "postgres", "draft"]
---

## Some points from documentation

See https://www.postgresql.org/docs/16/storage-file-layout.html
| Path | Comments |
| ---------- | --------- |
| `/etc/postgresql/16/main` | Contains config entries for postgresql |

```
ps ax | grep postgres

/usr/lib/postgresql/16/bin/postgres -D /var/lib/postgresql/16/main -c config_file=/etc/postgresql/16/main/postgresql.conf

postgres:x:109:113:PostgreSQL administrator,,,:/var/lib/postgresql:/bin/bash
PATH=$PATH:/usr/lib/postgresql/16/bin/
su postgres

pg_ctl status -D /var/lib/postgresql/16/main

$ pg_lsclusters -h
16 main 5432 online postgres /var/lib/postgresql/16/main /var/log/postgresql/postgresql-16-main.log



 # After `initdb` is called, there are three databases created

 psql

 > \l;
                                                    List of databases
   Name    |  Owner   | Encoding | Locale Provider | Collate |  Ctype  | ICU Locale | ICU Rules |   Access privileges
-----------+----------+----------+-----------------+---------+---------+------------+-----------+-----------------------
 postgres  | postgres | UTF8     | libc            | C.UTF-8 | C.UTF-8 |            |           |
 template0 | postgres | UTF8     | libc            | C.UTF-8 | C.UTF-8 |            |           | =c/postgres          +
           |          |          |                 |         |         |            |           | postgres=CTc/postgres
 template1 | postgres | UTF8     | libc            | C.UTF-8 | C.UTF-8 |            |           | =c/postgres          +
           |          |          |                 |         |         |            |           | postgres=CTc/postgres

# To reload the pg_hba.conf file

SELECT pg_reload_conf()
pg_ctl reload


# the default hba rules are:

# Database administrative login by Unix domain socket
local   all             postgres                                peer

```

To allow remote connections:
https://www.bigbinary.com/blog/configure-postgresql-to-allow-remote-connection

## References
