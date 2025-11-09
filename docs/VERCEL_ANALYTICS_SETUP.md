# Vercel Analytics Setup Guide

## Overview

FOSSRadar.in now uses **Vercel Analytics API** to display real page view counts on individual project pages. This provides accurate, persistent analytics data powered by Vercel's infrastructure.

## Benefits

✅ **Accurate Data** - Real analytics from Vercel Analytics
✅ **Persistent** - Data survives deployments and restarts
✅ **No Custom Tracking** - Uses existing Vercel Analytics infrastructure
✅ **Cached** - 1-hour cache reduces API calls
✅ **Performant** - Edge runtime with CDN caching

## Setup Instructions

### Step 1: Enable Vercel Analytics

1. Go to your Vercel project dashboard
2. Navigate to **Analytics** tab
3. Enable **Web Analytics** if not already enabled
4. Vercel Analytics is already integrated via `@vercel/analytics` package

### Step 2: Create Vercel Access Token

1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Click **Create Token**
3. Name it: `fossradar-analytics`
4. Select scope: **Full Account** or **Specific Team**
5. Click **Create**
6. Copy the token (you won't see it again!)

### Step 3: Get Project ID

**Option A: From Vercel Dashboard**
1. Go to your project settings
2. Navigate to **General** tab
3. Find **Project ID** under project information
4. Copy the ID (format: `prj_xxxxxxxxxxxxx`)

**Option B: From Vercel CLI**
```bash
vercel project ls
```

### Step 4: Get Team ID (If Using a Team)

**Option A: From Vercel Dashboard**
1. Go to team settings
2. Navigate to **General** tab
3. Find **Team ID**
4. Copy the ID (format: `team_xxxxxxxxxxxxx`)

**Option B: From Vercel CLI**
```bash
vercel teams ls
```

**Note**: If you're using a personal account (not a team), you can leave `VERCEL_TEAM_ID` empty.

### Step 5: Set Environment Variables

Add these to your Vercel project environment variables:

1. Go to **Project Settings → Environment Variables**
2. Add the following variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `VERCEL_ACCESS_TOKEN` | Your access token | Production, Preview |
| `VERCEL_PROJECT_ID` | Your project ID | Production, Preview |
| `VERCEL_TEAM_ID` | Your team ID (optional) | Production, Preview |

**Important**: Check all environment types (Production, Preview, Development) for each variable.

### Step 6: Redeploy

After adding environment variables:
```bash
git commit --allow-empty -m "Trigger redeployment for analytics"
git push
```

Or trigger a redeploy from the Vercel dashboard.

## Verification

After deployment, visit any project page (e.g., `/projects/fossradar`) and check:

1. **Page Views Card** should show "Powered by Vercel Analytics"
2. View count should be greater than 0 (if page has been visited)
3. Check browser console - no errors about analytics

## API Endpoint

The analytics data is fetched from:
```
GET /api/analytics/{slug}
```

**Response:**
```json
{
  "slug": "fossradar",
  "views": 1234,
  "source": "vercel-analytics"
}
```

**Sources:**
- `vercel-analytics` - Successfully fetched from Vercel API
- `unconfigured` - Environment variables not set
- `api-error` - Vercel API returned an error
- `error` - General error occurred

## Troubleshooting

### Views Showing as 0

**Possible causes:**
1. Environment variables not set correctly
2. Access token doesn't have proper permissions
3. Project ID or Team ID incorrect
4. Page hasn't been visited yet

**Solution:**
- Check Vercel Dashboard → Environment Variables
- Verify token has read access to analytics
- Check browser console for error messages

### "Analytics being configured..." Message

This means the API is not returning data from Vercel Analytics. Check:
1. Environment variables are set
2. Token is valid
3. Redeploy after adding variables

### API Rate Limits

Vercel Analytics API has rate limits:
- 1-hour cache on responses reduces API calls
- CDN caching further reduces load
- Should be well within free tier limits

## Cost

- **Vercel Analytics**: Free tier includes 100k events/month
- **API Calls**: Cached for 1 hour, minimal usage
- **Estimated**: Should stay within free tier

## Local Development

For local development:

1. Copy `.env.example` to `.env.local`
2. Add your Vercel credentials
3. Run `pnpm dev`

**Note**: Analytics data will show 0 in development if not configured.

## Alternative: Google Analytics API

If you prefer using Google Analytics instead, you can:

1. Set up Google Analytics 4 Data API
2. Create a service account
3. Modify `/api/analytics/[slug]/route.ts` to use GA4 API

See Google Analytics documentation for setup.

## Security

- ✅ Access token is server-side only (never exposed to client)
- ✅ Edge runtime for fast, secure execution
- ✅ No sensitive data in responses
- ✅ Rate limiting built into Vercel API

## Support

For issues or questions:
- Check [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- Check [Vercel API Docs](https://vercel.com/docs/rest-api)
- File an issue on GitHub
