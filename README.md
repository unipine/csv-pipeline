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
[START]  77.25220000743866
[END]  2249.133399963379
[TOOK]  2171.8811999559402 

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
BTC:  861115469.1338152 USD
ETH:  52230039.69658109 USD
XRP:  10304.759969011366 USD
```

## Solution

- Used [`csv-parser`](https://www.npmjs.com/package/csv-parser), a dedicated Node.js library for CSV processing, due to the large source file size.
- Calculated portfolio while file streaming.
- Got the latest cryptocurrency rates from [CryptoCompare API](https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD) after streaming was complete.
- Used [`axios`](https://www.npmjs.com/package/axios) library for HTTP request.
- Implemented multiple promises to handle a lot of asynchronous process.
- CSV streaming time tracking is available.

It took about 30 minutes to complete.