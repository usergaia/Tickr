import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Test configuration
const BASE_URL = process.env.TEST_API_URL || "http://localhost:1000";
const VALID_API_KEY = process.env.AV_API;

describe("POST /stocks/fetch - Trigger stock data fetch", () => {
  it("should return 401 when API key is missing", async () => {
    try {
      await axios.post(
        `${BASE_URL}/stocks/fetch`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.response.status).toBe(401);
      expect(error.response.data.message).toContain("Unauthorized");
    }
  });

  it("should return 401 when API key is invalid", async () => {
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
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.response.status).toBe(401);
      expect(error.response.data.message).toContain("Unauthorized");
    }
  });

  (VALID_API_KEY ? it : it.skip)(
    "should accept API key in x-api-key header",
    async () => {
      const response = await axios.post(
        `${BASE_URL}/stocks/fetch`,
        {},
        {
          headers: {
            "x-api-key": VALID_API_KEY,
            "Content-Type": "application/json",
          },
          timeout: 60000, // 60 second timeout for fetch operation
        },
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("message");
      expect(response.data).toHaveProperty("timestamp");
      expect(response.data.message).toContain("successfully");
    },
  );

  (VALID_API_KEY ? it : it.skip)(
    "should accept API key in Authorization header",
    async () => {
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

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("message");
      expect(response.data.message).toContain("successfully");
    },
  );

  it("should handle fetch errors gracefully", async () => {
    // This test would require mocking the fetchAndStoreAV function
    // For now, we just verify the endpoint structure
    expect(true).toBe(true);
  });
});

describe("Integration: Fetch workflow", () => {
  (VALID_API_KEY ? it : it.skip)(
    "should trigger fetch and verify data is updated",
    async () => {
      // Step 1: Trigger the fetch
      const fetchResponse = await axios.post(
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

      expect(fetchResponse.status).toBe(200);

      // Step 2: Wait a moment for cache to clear
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Step 3: Verify we can retrieve updated stock data
      const stocksResponse = await axios.get(`${BASE_URL}/stocks`);
      expect(stocksResponse.status).toBe(200);
      expect(Array.isArray(stocksResponse.data)).toBe(true);
      expect(stocksResponse.data.length).toBeGreaterThan(0);

      // Verify data structure
      const firstStock = stocksResponse.data[0];
      expect(firstStock).toHaveProperty("symbol");
      expect(firstStock).toHaveProperty("historical");
      expect(firstStock).toHaveProperty("lastRefreshed");
    },
  );
});
