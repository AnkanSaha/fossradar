# Vercel Production Setup Guide

This document outlines the required environment variables and configuration for deploying FOSSRadar to Vercel.

## Required Environment Variables

### 1. GitHub OAuth (Required for Authentication Features)

These are **required** for the GitHub Star button and Quick Submission Form to work.

```env
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
```

**How to get these:**
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: `FOSSRadar Production`
   - Homepage URL: `https://fossradar.in`
   - Authorization callback URL: `https://fossradar.in/api/auth/callback/github`
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret

**⚠️ CRITICAL:** Without these, the `/api/auth/[...nextauth]` endpoint will error with 8% function errors.

### 2. NextAuth Configuration (Required)

```env
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=https://fossradar.in
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. GitHub API (Optional - for enrichment script)

```env
GITHUB_TOKEN=your_github_personal_access_token
```

**Note:** This is **NOT required** on Vercel because:
- The enrichment script runs via GitHub Actions, not on Vercel
- GitHub Actions provides `GITHUB_TOKEN` automatically

### 4. Admin API Key (Optional - for sitemap ping)

```env
ADMIN_API_KEY=your_random_admin_key
```

**Generate:**
```bash
openssl rand -base64 32
```

This secures the `/api/ping-sitemap` endpoint.

## Vercel Configuration Steps

### Step 1: Add Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `GITHUB_CLIENT_ID` | From GitHub OAuth App | Production |
| `GITHUB_CLIENT_SECRET` | From GitHub OAuth App | Production |
| `NEXTAUTH_SECRET` | Generate with openssl | Production |
| `NEXTAUTH_URL` | `https://fossradar.in` | Production |
| `ADMIN_API_KEY` | Generate with openssl (optional) | Production |

### Step 2: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **"Redeploy"** button
4. OR push a new commit to trigger deployment

### Step 3: Verify

1. Visit `https://fossradar.in`
2. Try the GitHub Star button on any project page
3. Check Vercel logs for any errors in `/api/auth/[...nextauth]`

## Common Issues

### Issue: 8% Function Errors on `/api/auth/[...nextauth]`

**Cause:** Missing GitHub OAuth credentials

**Solution:**
1. Verify `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are set in Vercel
2. Verify the OAuth callback URL in GitHub matches: `https://fossradar.in/api/auth/callback/github`
3. Redeploy after adding variables

### Issue: "Configuration" errors in NextAuth

**Cause:** Missing or invalid `NEXTAUTH_SECRET`

**Solution:**
1. Generate a new secret: `openssl rand -base64 32`
2. Add to Vercel environment variables
3. Redeploy

### Issue: Authentication redirects fail

**Cause:** Incorrect `NEXTAUTH_URL`

**Solution:**
1. Set `NEXTAUTH_URL=https://fossradar.in` (no trailing slash)
2. Redeploy

## Monitoring

Monitor function errors in Vercel:
1. Go to **Analytics** tab
2. Check **Functions** section
3. Look for errors in `/api/auth/[...nextauth]`

Expected error rate after proper configuration: **0%**

## Security Notes

1. **Never commit** OAuth credentials or secrets to git
2. Rotate secrets periodically
3. Use separate OAuth apps for development and production
4. Keep `ADMIN_API_KEY` secure and unique

## Support

If errors persist after configuration:
1. Check Vercel function logs
2. Verify all environment variables are set correctly
3. Ensure GitHub OAuth callback URL matches production URL
4. Try redeploying with fresh environment variables
