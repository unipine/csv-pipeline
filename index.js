const csv = require("csv-parser");
const fs = require("fs");

function solution() {
  const portfolio = {};
  const WITHDRAWAL = "WITHDRAWAL";

  fs.createReadStream("data/transactions.csv")
    .pipe(csv())
    .on("data", function ({ timestamp, transaction_type, token, amount }) {
      if (!portfolio[token]) portfolio[token] = 0;
      if (transaction_type === WITHDRAWAL) amount = -amount;
      portfolio[token] += +amount;
    })
    .on("end", function async() {
      console.log(portfolio);
    });
}

solution();
