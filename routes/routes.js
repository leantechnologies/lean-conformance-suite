const express = require("express");
const fetchRawBankResponse = require("../services/s3Service");
const generateReport = require("../handlers/reports.handler");
const conformanceHandler = require("../handlers/conformance.handler");
const router = express.Router();
const global = require("../global");

router.get("/accounts", async (req, res) => {
  console.log("=== CONFORMANCE FOR ACCOUNTS ENDPOINT ===");
  const response = await fetchRawBankResponse();
  if (!response) {
    return res.status(500).json("No data for this endpoint found");
  }
  res.json(JSON.parse(response));
});

router.get("/accounts/:uuid/balances", async (req, res) => {
  console.log("=== CONFORMANCE FOR BALANCES ENDPOINT ===");
  const response = await fetchRawBankResponse();
  if (!response) {
    return res.status(500);
  }
  res.json(JSON.parse(response));
});

router.get("/accounts/:uuid/transactions", async (req, res) => {
  console.log("=== CONFORMANCE FOR TRANSACTIONS ENDPOINT ===");
  const response = await fetchRawBankResponse();
  if (!response) {
    return res.status(500);
  }
  res.json(JSON.parse(response));
});

router.get("/accounts/:uuid/beneficiaries", async (req, res) => {
  console.log("=== CONFORMANCE FOR BENEFICIARIES ENDPOINT ===");
  const response = await fetchRawBankResponse();
  if (!response) {
    return res.status(500);
  }
  res.json(JSON.parse(response));
});

router.get("/accounts/:uuid/scheduled-payments", async (req, res) => {
  console.log("=== CONFORMANCE FOR SCHEDULED PAYMENTS ENDPOINT ===");
  const response = await fetchRawBankResponse();
  if (!response) {
    return res.status(500);
  }
  res.json(JSON.parse(response));
});

router.get("/accounts/:uuid/standing-orders", async (req, res) => {
  console.log("=== CONFORMANCE FOR STANDING ORDERS ENDPOINT ===");
  const response = await fetchRawBankResponse();
  if (!response) {
    return res.status(500);
  }
  res.json(JSON.parse(response));
});

router.get("/parties", async (req, res) => {
  console.log("=== CONFORMANCE FOR IDENTITY ENDPOINT ===");
  const response = await fetchRawBankResponse();
  if (!response) {
    return res.status(500);
  }
  res.json(JSON.parse(response));
});

router.get("/accounts/:uuid/parties", async (req, res) => {
  console.log("=== CONFORMANCE FOR ACCOUNTS IDENTITY ENDPOINT ===");
  const response = await fetchRawBankResponse();
  if (!response) {
    return res.status(500);
  }
  res.json(JSON.parse(response));
});

router.get("/reports", async (req, res) => {
  try {
    const report = await generateReport();
    res.json(report);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/conformance/:bank_identifier/:endpoint", async (req, res) => {
  const { bank_identifier, endpoint } = req.params;
  global.bank_identifier = bank_identifier;
  global.user_requested_endpoint = endpoint;
  try {
    const response = await conformanceHandler.runConformance(
      bank_identifier,
      endpoint,
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
