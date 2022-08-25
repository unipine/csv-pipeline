const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.API_KEY;
const SERVICE_ENDPOINT = "https://min-api.cryptocompare.com/data/price";

const now =
  typeof performance === "object" && performance.now
    ? performance.now.bind(performance)
    : Date.now.bind(Date);

const getRate = (token) =>
  axios
    .get(`${SERVICE_ENDPOINT}?fsym=${token}&tsyms=USD&api_key=${API_KEY}`)
    .then(({ data }) => ({ token, rate: data["USD"] }))
    .catch((error) => {
      console.error(error);
      return false;
    });

function solution() {
  const portfolio = {};
  const WITHDRAWAL = "WITHDRAWAL";

  const start = now();
  console.log("[START] ", start);
  const transactions = {};

  fs.createReadStream("data/transactions.csv")
    .pipe(csv())
    .on("data", function ({ timestamp, transaction_type, token, amount }) {
      if (!portfolio[token]) portfolio[token] = 0;
      if (!transactions[token]) transactions[token] = 0;
      if (transaction_type === WITHDRAWAL) amount = -amount;
      portfolio[token] += +amount;
      transactions[token]++;
    })
    .on("end", function async() {
      const end = now();
      console.info("[END] ", end);
      console.info("[TOOK] ", end - start, "\n");

      console.log("Number of transactions: ");
      Object.keys(transactions).forEach((token) =>
        console.log(`${token}: `, transactions[token])
      );
      console.log(
        "Total: ",
        Object.values(transactions).reduce((partialSum, a) => partialSum + a, 0)
      );

      console.log("\nPortfolio (crypto): ");
      Object.keys(portfolio).forEach((token) =>
        console.log(`${token}: `, portfolio[token])
      );

      const tokens = Object.keys(portfolio);
      const promises = tokens.map((token) => getRate(token));

      Promise.all(promises).then((result) => {
        console.log("\nPortfolio (USD): ");
        result.forEach((item) =>
          item
            ? console.log(
                `${item.token}: `,
                portfolio[item.token] * item.rate,
                "USD"
              )
            : console.warn(
                `An error occurred while getting ${item.token} rate from ${SERVICE_ENDPOINT}.`
              )
        );
      });
    });
}

solution();
