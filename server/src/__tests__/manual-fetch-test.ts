/**
 * Manual test script for POST /stocks/fetch endpoint
 * Run with: npx ts-node src/__tests__/manual-fetch-test.ts
 */

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.TEST_API_URL || "http://localhost:1000";
const VALID_API_KEY = process.env.AV_API;

async function runTests() {
  console.log("Testing POST /stocks/fetch endpoint\n");
  console.log(`Base URL: ${BASE_URL}\n`);

  let passed = 0;
  let failed = 0;

  // Test 1: Missing API key
  console.log("Test 1: Missing API key should return 401");
  try {
    await axios.post(
      `${BASE_URL}/stocks/fetch`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    console.log("FAILED: Should have returned 401\n");
    failed++;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("PASSED: Returned 401 as expected\n");
      passed++;
    } else {
      console.log(`FAILED: Got status ${error.response?.status}\n`);
      failed++;
    }
  }

  // Test 2: Invalid API key
  console.log("Test 2: Invalid API key should return 401");
  try {
    await axios.post(
      `${BASE_URL}/stocks/fetch`,
      {},
      {
        headers: {
          "x-api-key": "invalid-key",
          "Content-Type": "application/json",
        },
      },
    );
    console.log("FAILED: Should have returned 401\n");
    failed++;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("PASSED: Returned 401 as expected\n");
      passed++;
    } else {
      console.log(`FAILED: Got status ${error.response?.status}\n`);
      failed++;
    }
  }

  // Test 3: Valid API key in x-api-key header
  if (VALID_API_KEY) {
    console.log("Test 3: Valid API key in x-api-key header should succeed");
    try {
      const response = await axios.post(
        `${BASE_URL}/stocks/fetch`,
        {},
        {
          headers: {
            "x-api-key": VALID_API_KEY,
            "Content-Type": "application/json",
          },
          timeout: 60000,
        },
      );
      if (
        response.status === 200 &&
        response.data.message?.includes("successfully")
      ) {
        console.log("PASSED: Fetch succeeded\n");
        console.log(`Response: ${JSON.stringify(response.data, null, 2)}\n`);
        passed++;
      } else {
        console.log(`FAILED: Unexpected response\n`);
        failed++;
      }
    } catch (error: any) {
      console.log(`FAILED: ${error.message}\n`);
      if (error.response?.data) {
        console.log(`Error details: ${JSON.stringify(error.response.data)}\n`);
      }
      failed++;
    }

    // Test 4: Valid API key in Authorization header
    console.log("Test 4: Valid API key in Authorization header should succeed");
    try {
      const response = await axios.post(
        `${BASE_URL}/stocks/fetch`,
        {},
        {
          headers: {
            Authorization: VALID_API_KEY,
            "Content-Type": "application/json",
          },
          timeout: 60000,
        },
      );
      if (
        response.status === 200 &&
        response.data.message?.includes("successfully")
      ) {
        console.log("PASSED: Fetch succeeded\n");
        passed++;
      } else {
        console.log(`FAILED: Unexpected response\n`);
        failed++;
      }
    } catch (error: any) {
      console.log(`FAILED: ${error.message}\n`);
      failed++;
    }

    // Test 5: Verify data is accessible after fetch
    console.log("Test 5: Verify stock data is accessible after fetch");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for cache clear
      const response = await axios.get(`${BASE_URL}/stocks`);
      if (
        response.status === 200 &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        console.log(`PASSED: Retrieved ${response.data.length} stocks\n`);
        passed++;
      } else {
        console.log(`FAILED: No stock data found\n`);
        failed++;
      }
    } catch (error: any) {
      console.log(`FAILED: ${error.message}\n`);
      failed++;
    }
  } else {
    console.log("Skipping tests 3-5: AV_API not set in environment\n");
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log("=".repeat(50));

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((error) => {
  console.error("Test execution failed:", error);
  process.exit(1);
});
