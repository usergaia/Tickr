# Testing the Fetch Endpoint

## Prerequisites

**Important:** The server must be running before you run tests!

### Terminal 1 - Start the server:

```bash
cd server
npm run dev
```

Wait for: `Server running on http://localhost:1000`

### Terminal 2 - Run tests:

```bash
cd server
npm run test:manual
```

Or for Jest tests:

```bash
cd server
npm test
```

---

## Test Results

### What's Working

- Authentication tests (401 for missing/invalid API keys)
- API key validation in both `x-api-key` and `Authorization` headers
- Data retrieval after fetch
- Integration workflow

### Note

Tests that require `AV_API` will be skipped if the environment variable is not set. Make sure your `.env` file has:

```
AV_API=your_alpha_vantage_api_key
```

---

This will run comprehensive tests including:

- Missing API key (should return 401)
- Invalid API key (should return 401)
- Valid API key in `x-api-key` header
- Valid API key in `Authorization` header
- Data verification after fetch

## Using Jest

```bash
npm test
```

## Manual cURL Testing

### Test with valid API key:

```bash
curl -X POST http://localhost:1000/stocks/fetch \
  -H "x-api-key: YOUR_AV_API_KEY" \
  -H "Content-Type: application/json"
```

### Test with invalid key (should fail):

```bash
curl -X POST http://localhost:1000/stocks/fetch \
  -H "x-api-key: invalid-key" \
  -H "Content-Type: application/json"
```

### Test without key (should fail):

```bash
curl -X POST http://localhost:1000/stocks/fetch \
  -H "Content-Type: application/json"
```

## Expected Responses

### Success (200):

```json
{
  "message": "Stock data fetched and stored successfully",
  "timestamp": "2025-10-24T12:00:00.000Z"
}
```

### Unauthorized (401):

```json
{
  "message": "Unauthorized: Invalid API key"
}
```

### Error (500):

```json
{
  "message": "Failed to fetch stock data",
  "error": "error details"
}
```
