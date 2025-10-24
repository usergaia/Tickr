# GitHub Actions Test Workflows

## Test Schedule Workflow (`test-schedule.yml`)

**Purpose**: Simple test to verify GitHub Actions scheduling works correctly.

### What it does:
- Runs **every 5 minutes** automatically
- Logs timestamps in UTC and Manila time
- Tests basic connectivity to your Render server
- Can be triggered manually for immediate testing

### How to test it:

#### 1. **Manual Test (Immediate)**
1. Go to your GitHub repo → **Actions** tab
2. Click **"Test Schedule (Every 5 min)"** in the left sidebar
3. Click **"Run workflow"** → **"Run workflow"**
4. Watch the logs - you should see timestamps and success messages

#### 2. **Automatic Test (Wait 5 minutes)**
1. Push this workflow to GitHub
2. Wait 5 minutes
3. Go to **Actions** tab
4. You should see new runs appearing every 5 minutes
5. Each run will show as event type: `schedule`

### Expected Output:
```
Scheduled test ran successfully!
Current time (UTC): 2025-10-24 14:35:00
Current time (Manila): 2025-10-24 22:35:00
This workflow is working!
Testing connection to server...
{"status":"healthy","timestamp":"2025-10-24T14:35:00.123Z"}
```

---

## Production Workflow (`fetch-stock-data.yml`)

**Purpose**: Fetch stock data from AlphaVantage daily at 5am Manila time.

### What it does:
- Runs **daily at 05:00 Asia/Manila** (21:00 UTC previous day)
- Calls your `/stocks/fetch` API endpoint
- Requires `AV_API` secret
- Can be triggered manually

### Setup:
1. Add `AV_API` secret to GitHub (Settings → Secrets → Actions)
2. Optional: Add `API_URL` secret if your Render URL differs from default

### How to test:
1. **Manual**: Actions → "Scheduled stock fetch" → Run workflow
2. **Automatic**: Wait for 5am Manila time (9pm UTC previous day)

---

## Recommended Testing Flow:

1. **Now**: Test the 5-minute workflow (manual trigger)
2. **Wait 5 min**: Verify it runs automatically
3. **Disable it**: Once confirmed working, you can disable or delete `test-schedule.yml`
4. **Enable production**: Keep `fetch-stock-data.yml` for daily fetches

---

## Important Note:

**GitHub Actions free tier limits:**
- 2,000 minutes/month for private repos
- Unlimited for public repos

The 5-minute test workflow will use ~8,640 runs/month if left running continuously. For testing purposes, disable or delete it after confirming it works!

### To disable:
1. Go to Actions → "Test Schedule (Every 5 min)"
2. Click the "..." menu → "Disable workflow"

Or just delete `.github/workflows/test-schedule.yml`
