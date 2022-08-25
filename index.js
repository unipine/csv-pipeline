const csv = require("csv-parser");
const fs = require("fs");

const now =
  typeof performance === "object" && performance.now
    ? performance.now.bind(performance)
    : Date.now.bind(Date);

function solution() {
  const portfolio = {};
  const WITHDRAWAL = "WITHDRAWAL";

  const start = now();
  console.info("[START] ", start);

  fs.createReadStream("data/transactions.csv")
    .pipe(csv())
    .on("data", function ({ timestamp, transaction_type, token, amount }) {
      if (!portfolio[token]) portfolio[token] = 0;
      if (transaction_type === WITHDRAWAL) amount = -amount;
      portfolio[token] += +amount;
    })
    .on("end", function async() {
      console.info("[END] ", now() - start);
      console.log(portfolio);
    });
}

solution();
