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

Promise.all([loadDatabase(1)]).then(() => {
  exit(0);
});

