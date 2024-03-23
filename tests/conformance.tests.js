const axios = require("axios");
require("dotenv").config();
const uuid = "e36dfb06-b007-4dcb-8b99-b9d10451ac12";
const host = process.env.HOST + ":" + process.env.PORT;
const { endpointList } = require("../models/data");
const config = {
  method: "get",
  headers: {
    authorization: "Bearer ",
  },
};

// test for conformance

async function runTests() {
  for (let index = 0; index < endpointList.length; index++) {
    config.url = host + endpointList[index];
    console.log(`=== ENDPOINT TO TEST ${endpointList[index]} ===`);
    try {
      await axios.request(config);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("=== RESULTS ARE AVAILABLE INSIDE RESULTS FOLDER ===");
}

runTests();
