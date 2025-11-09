# Quick Start Guide - FOSSRadar

Complete guide for setting up FOSSRadar locally and deploying to production.

---

## 🚀 For First-Time Setup

### 1. Clone the Repository

```bash
git clone https://github.com/wbfoss/fossradar.git
cd fossradar
```

### 2. Install Dependencies

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3. Set Up Environment (Optional for Local Dev)

```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` and add your GitHub token (only needed for testing validation/enrichment):

```bash
GITHUB_TOKEN=ghp_your_personal_access_token
```

**Get your token at**: https://github.com/settings/tokens
- Select scope: `public_repo` (read-only)
- This is **optional** for UI development

### 4. Run Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

---

## 📋 Available Scripts

```bash
# Development
pnpm dev              # Start dev server (port 3000)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Data Management
pnpm validate         # Validate all TOML files (requires GITHUB_TOKEN)
pnpm run build:index  # Generate search index
pnpm enrich           # Update project metadata (requires GITHUB_TOKEN)
```

---

## 🏗️ Project Structure

```
fossradar/
├── app/
│   ├── page.tsx              # Homepage
│   ├── radar/page.tsx        # Geographic visualization
│   ├── projects/[slug]/      # Project detail pages
│   └── api/                  # API routes
├── components/               # React components
├── lib/                      # Utilities
├── scripts/
│   ├── validate.ts           # TOML validation
│   ├── enrich.ts             # Update metadata
│   └── build-index.ts        # Generate search index
├── data/
│   ├── projects/             # Project TOML files
│   ├── tags.toml             # Allowed tags
│   └── licenses-osi.json     # OSI licenses
└── public/
    └── logos/                # Project logos
```

---

## 🚢 Deploying to Production

### Option 1: Deploy to Vercel (Recommended)

**Step 1: Push to GitHub**
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: FOSSRadar.in"
git branch -M main
git remote add origin https://github.com/wbfoss/fossradar.git
git push -u origin main
```

**Step 2: Deploy to Vercel**
1. Visit https://vercel.com/new
2. Import GitHub repository: `wbfoss/fossradar`
3. Configure settings:
   - Framework Preset: **Next.js**
   - Build Command: `pnpm build`
   - Output Directory: `.next`
4. Add environment variables (optional):
   ```
   SITE_URL=https://fossradar.in
   ```
5. Deploy!

**Step 3: Add Custom Domain**
- Go to Project Settings → Domains
- Add: `fossradar.in`
- Configure DNS as per Vercel instructions

### Option 2: Self-Host with Node.js

```bash
# Build the application
pnpm build

# Start production server
pnpm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "fossradar" -- start
pm2 save
pm2 startup
```

### Option 3: Deploy with Docker

```bash
# Build Docker image
docker build -t fossradar .

# Run container
docker run -p 3000:3000 fossradar
```

---

## 🔧 GitHub Actions Configuration

**No manual setup required!** All workflows automatically use `secrets.GITHUB_TOKEN`.

### Workflows Included

1. **`validate.yml`** - Runs on every PR
   - Validates TOML files
   - Checks repository accessibility
   - Auto-verifies PR author affiliation
   - Comments on PR with results

2. **`enrich.yml`** - Runs nightly (2 AM UTC)
   - Updates star counts
   - Updates good first issues count
   - Updates verification status

3. **`ci.yml`** - Runs on push/PR
   - Builds the project
   - Ensures no build errors

---

## 📝 Adding Your First Project

### Method 1: Via Pull Request (Recommended)

1. **Add `fossradar` topic to your GitHub repo**

2. **Fork the repository**
   - Go to https://github.com/wbfoss/fossradar
   - Click "Fork"

3. **Create project file**
   ```bash
   cd data/projects
   nano your-project-slug.toml
   ```

4. **Add your logo**
   ```bash
   cp /path/to/logo.svg public/logos/your-project.svg
   ```

5. **Commit and push**
   ```bash
   git add data/projects/your-project-slug.toml public/logos/your-project.svg
   git commit -m "Add [Your Project Name]"
   git push
   ```

6. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "Contribute" → "Open Pull Request"

### Method 2: Local Testing

```bash
# Add your project file
nano data/projects/test-project.toml

# Validate locally (requires GITHUB_TOKEN)
pnpm validate

# Build search index
pnpm run build:index

# Test in dev mode
pnpm dev
```

---

## 🧪 Testing

### Test Validation Script

```bash
# Set GitHub token
export GITHUB_TOKEN=ghp_your_token

# Run validation
pnpm validate
```

### Test Enrichment Script

```bash
# Update all project metadata
pnpm enrich

# This will:
# - Fetch latest star counts
# - Count good first issues
# - Update verification status
```

### Test Build

```bash
# Build production version
pnpm build

# Start production server
pnpm start
```

---

## 🔍 Troubleshooting

### "GITHUB_TOKEN environment variable is required"

**Solution**: This is only needed for validation/enrichment scripts.
- For local dev: Add token to `.env`
- For GitHub Actions: Automatically provided (no action needed)
- For UI development: Not required

### "Module not found" errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### "Port 3000 is already in use"

**Solution**:
```bash
# Use a different port
PORT=3001 pnpm dev
```

### Build fails with TypeScript errors

**Solution**:
```bash
# Check for linting errors
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix
```

---

## 📚 Additional Resources

- **Main README**: [../README.md](../README.md)
- **PR Workflow**: [./PR_WORKFLOW.md](./PR_WORKFLOW.md)
- **Contributing Guide**: [../CONTRIBUTING.md](../CONTRIBUTING.md)
- **Security Policy**: [../SECURITY.md](../SECURITY.md)

---

## ✅ Pre-Deployment Checklist

Before going live, ensure:

- [ ] All sample projects have valid GitHub URLs
- [ ] Logo files exist for all projects
- [ ] Tags are from the allowlist (`data/tags.toml`)
- [ ] Build succeeds (`pnpm build`)
- [ ] No TypeScript errors (`pnpm lint`)
- [ ] Search index builds (`pnpm run build:index`)
- [ ] Custom domain configured (if using)
- [ ] GitHub Actions enabled
- [ ] Repository topics added

---

**Need Help?** Open an issue or discussion at https://github.com/wbfoss/fossradar
