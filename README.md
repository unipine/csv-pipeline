## Overview

This repository contains a Node.js script that calculates the portfolio of each cryptocurrency with transaction data in a CSV file.

## Run the script

Install dependencies.

```
npm install
```

Rename `example.env` to `.env` and update the API key with the real key.

```
npm run start
```

You get the result as below.
```
[START]  85.22239995002747
[END]  2144.940400004387 

Number of transactions: 
BTC:  399264
ETH:  300467
XRP:  300268
Total:  999999

Portfolio (crypto):
BTC:  39851.199060999104
ETH:  30572.309748000236
XRP:  29560.412992000474

Portfolio (USD):
BTC:  860998306.6085758 USD
ETH:  52221785.17294913 USD
XRP:  10301.803927712164 USD
```

## Solution

- Used [`csv-parser`](https://www.npmjs.com/package/csv-parser), a dedicated Node.js library for CSV processing, due to the large source file size.
- Calculated portfolio while file streaming.
- Got the latest cryptocurrency rates from [CryptoCompare API](https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD) after streaming was complete.
- Implemented multiple promises to handle a lot of asynchronous process.
- CSV streaming time tracking is available.

It took about 30 minutes to complete.