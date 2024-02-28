const express = require('express');
require('dotenv').config();
const path = require('path');
const axios = require('axios');
const app = express();
const routes = require('./routes/routes');
const accountsPath = '/accounts';
const port = 3000 || process.env.PORT // You can change the port if needed
const host = process.env.HOST;
const validations = require('./reports/conformance-report.json')
const fs = require('fs');
const http = require('http');
const global = require('./global')
const dataObject = require('./models/data')

app.use(express.json());

app.use((err, req, res, next) => {
  // format errors
  res.status(err.status || 500 || 200).json({
    message: err.message,
    errors: err.errors,
  });
});

app.use(routes);

app.listen(port, () => {
  console.log(process.env.HOST)
  console.log(`You can now check API conformance at ${host}:${port}`);
});
