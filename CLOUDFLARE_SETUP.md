# Cloudflare Workers + D1 Setup Guide

This guide will help you deploy the greetings API using Cloudflare Workers and D1 database.

## Prerequisites

1. Cloudflare account (free tier is sufficient)
2. Node.js installed on your computer
3. npm (comes with Node.js)

## Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

## Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open your browser to authenticate with Cloudflare.

## Step 3: Create D1 Database

```bash
wrangler d1 create kabar-bahagia-db
```

This will output something like:
```
Created database kabar-bahagia-db with id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**Important:** Copy the `database_id` from the output!

## Step 4: Update wrangler.toml

Edit `wrangler.toml` and add your database_id:

```toml
[[d1_databases]]
binding = "DB"
database_name = "kabar-bahagia-db"
database_id = "YOUR_DATABASE_ID_HERE"  # <-- Paste your database ID here
```

## Step 5: Initialize Database Schema

Run the SQL schema to create tables and add sample data:

```bash
wrangler d1 execute kabar-bahagia-db --file=schema.sql
```

You should see:
```
🌀 Mapping SQL input into an array of statements
🌀 Executing on kabar-bahagia-db (xxxxxxxx):
🚣 Executed 4 commands in 0.5s
```

## Step 6: Test Locally (Optional)

Test the worker locally before deploying:

```bash
wrangler dev
```

This will start a local server. You can test it with:

```bash
# Test GET greetings
curl http://localhost:8787/api/greetings

# Test POST greeting
curl -X POST http://localhost:8787/api/greetings \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "message": "Test message"}'
```

## Step 7: Deploy to Cloudflare

Deploy your worker:

```bash
wrangler deploy
```

You'll see output like:
```
 ⛅️ wrangler 3.x.x
------------------
Uploaded kabar-bahagia-api (x.xx sec)
Published kabar-bahagia-api (x.xx sec)
  https://kabar-bahagia-api.YOUR-SUBDOMAIN.workers.dev
```

**Important:** Copy your worker URL!

## Step 8: Update Frontend

Update the API URL in `script.js`:

Find this line:
```javascript
const API_BASE_URL = 'https://kabar-bahagia-api.fathakbarrb.workers.dev';
```

Replace with your actual worker URL from Step 7.

## Step 9: Commit and Push

```bash
git add .
git commit -m "Add Cloudflare Workers API for greetings"
git push origin main
```

Cloudflare Pages will automatically redeploy your site with the new API integration.

## Step 10: Test the Integration

1. Visit your wedding website
2. Try submitting a greeting
3. Refresh the page - your greeting should still be there
4. Open the site in a different browser/device - you should see the same greetings!

## Verify Database

You can check your database contents:

```bash
wrangler d1 execute kabar-bahagia-db --command="SELECT * FROM greetings"
```

## Troubleshooting

### "Database not found" error
- Make sure the database_id in wrangler.toml matches the one you created
- Run `wrangler d1 list` to see all your databases

### CORS errors in browser
- The worker already has CORS headers configured
- Make sure you're using the correct worker URL

### Greetings not appearing
1. Check browser console for errors (F12 → Console)
2. Verify the worker URL is correct in script.js
3. Test the API directly: `curl https://your-worker-url.workers.dev/api/greetings`

## Cost

- **D1 Database**: FREE (5GB storage, 5 million reads/day, 100k writes/day)
- **Workers**: FREE (100k requests/day)
- This is more than enough for a wedding website!

## Optional: Custom Domain

You can add a custom domain to your worker:

1. Go to Cloudflare Dashboard → Workers & Pages
2. Click on your worker
3. Settings → Triggers → Custom Domains
4. Add domain like: `api.kabar-bahagia.com`

Then update the API_BASE_URL in script.js to use your custom domain.
