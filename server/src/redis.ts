import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// check if Redis environment variables are available
if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  console.error(
    "UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN environment variables are not set",
  );
  process.exit(1);
}

// create and export Redis client using Upstash REST API
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Test ping
redis
  .ping()
  .then((result) => {
    console.log("Upstash Redis ping result:", result);
    console.log("Upstash Redis connected successfully");
  })
  .catch((err) => {
    console.error("Upstash Redis ping failed:", err);
  });
