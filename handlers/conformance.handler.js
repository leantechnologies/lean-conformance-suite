require("dotenv").config();
const axios = require("axios");
const dataObject = require("../models/data");
const host = process.env.HOST + ":" + process.env.WIRETAP_PORT;

const config = {
  method: "get",
  headers: {
    authorization: "Bearer ",
  },
};

async function runConformance(bank_identifier, endpoint) {
  try {
    // Check if the provided bank_identifier exists in the mapping
    if (!dataObject.bankList.includes(bank_identifier)) {
      throw new Error({ error: "Bank identifier not found" });
    }

    if (!(endpoint in dataObject.endpointList)) {
      throw new Error({ error: "Endpoint not found" });
    }

    await fetchDataForUserRequestedEndpoint(endpoint);
    // Make a request to the bank's API
    const response = await fetchDataForUserRequestedEndpoint("reports");
    return response;
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", JSON.stringify(error));
    throw new Error({ error: "Internal Server Error" });
  }
}

async function fetchDataForUserRequestedEndpoint(endpoint) {
  config.url = host + dataObject.endpointList[endpoint];
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    JSON.stringify(error);
    throw new Error({ error: "Internal Server Error" });
  }
}

module.exports = {
  runConformance,
  fetchDataForUserRequestedEndpoint,
};
