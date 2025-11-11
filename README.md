# FOSSRadar.in

> **Discover and showcase open source projects from India**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com/)

[![fossradar.in: Verified](https://img.shields.io/badge/fossradar.in-Verified-brightgreen?style=for-the-badge)](https://fossradar.in/projects/fossradar)

FOSSRadar.in is India's comprehensive directory celebrating FOSS (Free and Open Source Software) projects - whether through their **founders**, **creators**, **core contributors**, **organizational base**, or **project objectives** that serve the Indian community.

**Live Site**: [fossradar.in](https://fossradar.in)

---

## 🌟 What is FOSSRadar.in?

FOSSRadar.in is a **Git-based directory** that highlights the vibrant open source ecosystem from India. We showcase projects where:

- **Founders or core maintainers** are from India
- **Organizations** are based in or serve India
- **Project objectives** directly benefit Indian communities
- **Significant contributors** are from India

This is your platform to **discover innovative projects**, **find collaboration opportunities**, and **celebrate India's contribution** to the global open source movement.

---

## 📂 For Project Owners: Get Listed

### Why List Your Project?

- ✨ **Visibility**: Reach developers, contributors, and users across India and beyond
- 🤝 **Community**: Connect with Indian developers and potential collaborators
- 🏆 **Recognition**: Get your project verified and featured
- 📈 **Growth**: Attract contributors actively looking to support local projects
- 🗺️ **Geographic Insights**: See your project on our interactive state/city radar

### Eligibility Criteria

Your project qualifies if it meets **ANY** of these:

✅ **Founder/Creator Connection**
- Project founder(s) or creator(s) are from India
- Core maintainers are based in India

✅ **Organizational Connection**
- Organization/company is based in India
- Project originates from an Indian institution (university, research center, etc.)

✅ **Community/Objective Connection**
- Project serves Indian communities or addresses local challenges
- Built for or by Indian organizations/institutions
- Significant portion of contributors are from India

✅ **Technical Requirements** (Must meet ALL):
- Open source with OSI-approved license
- Public repository on GitHub
- Active or maintained (not abandoned)

### How to Submit Your Project

We offer **two submission methods** - choose what works best for you:

#### 🚀 Method 1: Quick Submission Form (Recommended)

**The easiest way to submit your project** - no Git knowledge required!

Visit [fossradar.in/submit/form](https://fossradar.in/submit/form) for a guided, interactive submission experience:

**Features:**
- ✨ **Auto-fetch project details** from your GitHub repository
- ✅ **Real-time validation** with helpful guidance
- 🔍 **Duplicate detection** prevents resubmissions
- 🏷️ **Smart tag suggestions** from your GitHub topics
- 🖼️ **Optional logo upload** (drag & drop)
- 📝 **TOML preview** before submission
- 🤖 **Automatic PR creation** - we create the pull request for you!

**How it works:**
1. Visit [fossradar.in/submit/form](https://fossradar.in/submit/form)
2. Enter your GitHub repository URL
3. Fill in the 5-step guided form (most fields auto-filled!)
4. Review the generated TOML file
5. Sign in with GitHub (required for automatic PR creation)
6. Submit - we'll create the pull request automatically!

**Note:** Requires GitHub authentication to create pull requests on your behalf.

---

#### 📝 Method 2: Manual Git Workflow (Traditional)

For developers who prefer the traditional Git workflow:

**Step 1: Add the `fossradar` topic to your GitHub repository**

Go to your repo → About section → ⚙️ Settings → Add `fossradar` to topics

**Step 2: Fork this repository**

Click the "Fork" button at the top of this page

**Step 3: Create your project TOML file**

Create a file `data/projects/your-project-slug.toml` (replace `your-project-slug` with your actual project slug).

📝 **Reference Template**: Check `data/projects/example-reference.toml` for a complete reference with all available fields and inline documentation.

```toml
# Example structure - replace with your actual project details
slug = "your-project"
name = "Your Awesome Project"
short_desc = "Brief description of what your project does (10-160 characters)"
repo = "https://github.com/yourusername/yourproject"
license = "MIT"
added_at = "2025-11-09"

# Mandatory fields
website = "https://yourproject.dev"
logo = "/logos/your-project.svg"
primary_lang = "TypeScript"
tags = ["web", "developer-tools", "typescript"]
looking_for_contributors = true
location_city = "Kolkata"
location_indian_state = "West Bengal"
```

**Important Notes:**
- All fields are **mandatory** (including website, logo, location)
- Place your logo (SVG/PNG, max 200KB) in `public/logos/`
- Choose tags from `data/tags.toml` allowlist
- Use valid Indian city and state names

**Step 4: Commit and push your changes**

```bash
git add data/projects/your-project.toml public/logos/your-logo.svg
git commit -m "Add [Your Project Name]"
git push origin main
```

**Step 5: Create a Pull Request**

Create a PR from your fork to the main repository. Our CI will automatically:
- Validate your TOML file format
- Check if all required fields are present
- Verify your project repository is accessible
- Determine if you're affiliated with the project (for auto-verification)

### Auto-Verification

If you're the **repository owner**, **organization member**, **collaborator**, or have **commits** in the repository, your project will be automatically marked as **Verified** ✓

Once verified, add this badge to your README:

```markdown
[![fossradar.in: Verified](https://img.shields.io/badge/fossradar.in-Verified-brightgreen?style=for-the-badge)](https://fossradar.in/projects/your-slug)
```

---

## 👨‍💻 For Contributors: Improve FOSSRadar

Want to help build and improve FOSSRadar itself? We welcome contributions!

### Ways to Contribute

#### 1. **Add Features**
- Search improvements and filters
- Analytics and visualizations
- Mobile app support
- Multi-language support (Bengali, Hindi)

#### 2. **Fix Bugs**
- Report issues you find
- Submit bug fixes
- Improve error handling

#### 3. **Improve UI/UX**
- Enhance design and accessibility
- Improve mobile experience
- Add animations and interactions

#### 4. **Documentation**
- Clarify instructions
- Add examples
- Write tutorials

#### 5. **Review Submissions**
- Review PRs from project owners
- Verify project information
- Suggest improvements

### Quick Start for Developers

```bash
# Clone the repository
git clone https://github.com/wbfoss/fossradar.git
cd fossradar

# Install dependencies
pnpm install

# Set up environment (optional for local dev)
cp .env.example .env
# Add GitHub token ONLY if you need to test validation/enrichment locally
# For UI development, you can skip this step

# Run development server
pnpm dev
```

Visit http://localhost:3000

**Note**: GitHub token is automatically provided in CI/CD - no manual setup needed for GitHub Actions!

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for detailed guidelines and **[docs/QUICK_START.md](./docs/QUICK_START.md)** for development setup.

---

## ✨ Features

### For Visitors

- 🔍 **Smart Search**: Fuzzy search across project names, descriptions, and tags
- 🏷️ **Category Filtering**: Browse by technology, domain, or project type
- 🗺️ **Geographic Radar**: Explore projects by state and city across India with interactive analytics
- 👥 **Contributor Insights**: See top contributors for each project with profile links
- 📦 **Quick Install**: One-click copy for installation commands (auto-detected for npm, pip, cargo, go)
- 🔗 **Similar Projects**: Discover related projects based on tags, tech stack, and location
- 📚 **Documentation Links**: Direct access to docs, changelogs, and issues
- ⭐ **GitHub Star Button**: One-click starring with GitHub OAuth (shows star count when already starred)
- 🔄 **Social Sharing**: Share projects on Twitter, LinkedIn, Facebook, and via email
- 🎨 **Dynamic Social Previews**: Beautiful OG images for homepage and projects (1200×630 optimized cards)
- ⭐ **Featured Projects**: Curated showcase of exceptional projects
- 🌙 **Dark Mode**: Easy on the eyes, system-aware theme
- 📱 **Responsive**: Perfect experience on mobile, tablet, and desktop

### For Project Owners

- 🚀 **Quick Submission Form**: Interactive 5-step form with auto-fill and validation (no Git required!)
- 🔍 **Duplicate Detection**: Prevents accidental resubmissions before you submit
- 🏷️ **Smart Tag Suggestions**: Auto-suggests tags from your GitHub repository topics
- 🖼️ **Logo Upload**: Drag-and-drop logo upload directly in the form
- 📝 **TOML Preview**: See exactly what will be created before submitting
- 🤖 **Auto PR Creation**: Form automatically creates pull request for you
- ✅ **Verified Status**: Auto-verification for project affiliates
- 📊 **Auto-Updated Stats**: Stars, contributors, good first issues, and metadata updated nightly
- 👥 **Contributor Showcase**: Top 10 contributors displayed with avatars on your project page
- 📦 **Smart Installation**: Auto-detected installation commands for npm, pip, cargo, go packages
- 📚 **Auto-Detected Docs**: Automatic discovery of documentation, changelog, and resources
- 🔗 **Similar Projects**: Your project recommended to users viewing related projects
- 🎯 **Looking for Contributors**: Flag projects actively seeking help
- 🗺️ **Location Tracking**: Show your project's geographic presence
- 🏆 **Featured Listings**: Opportunity to be highlighted

### Technical Features

- **Git as Database**: All data version-controlled in TOML files
- **No Runtime DB**: Fast, simple, auditable
- **Auto-Validation**: CI checks every submission
- **GitHub Integration**: OAuth, webhooks, API
- **SEO Optimized**: Sitemaps, structured data, OpenGraph, dynamic social preview images

---

## 🏗️ Tech Stack

Built with modern, performant technologies:

- **Framework**: Next.js 16 (App Router, React 19, TypeScript 5.6)
- **Styling**: Tailwind CSS 4 (latest major version with new CSS architecture)
- **Fonts**: VT323 (logo), Share Tech (headings), Inter (body) - via Next.js Google Fonts
- **Search**: Fuse.js (client-side fuzzy search)
- **Validation**: Zod 4.1.12 schemas
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)
- **Data**: TOML files in Git
- **Caching**: Public JSON cache for contributor data and metadata

---

## 🔄 Automatic Sitemap Updates

FOSSRadar.in automatically keeps the sitemap up-to-date and notifies search engines when new projects are added:

### How It Works

1. **Dynamic Sitemap Generation**
   - Sitemap regenerates every hour with all current projects
   - Uses project's `added_at` date for accurate `lastModified` timestamps
   - Properly prioritizes: Homepage (1.0) > Radar (0.9) > Projects (0.8) > About (0.7)

2. **Automatic Updates on New Projects**
   - When a PR is merged adding new projects, GitHub webhook triggers:
     - Sitemap revalidation
     - Automatic ping to Google and Bing search engines
   - No manual intervention required

3. **Daily Enrichment Updates**
   - Nightly workflow updates project metadata and stars
   - After updates, sitemap is pinged to search engines
   - Ensures search engines always have latest project data

4. **Manual Trigger** (if needed)
   - API endpoint available: `POST /api/ping-sitemap`
   - Requires `ADMIN_API_KEY` header for security
   - Useful for testing or forcing immediate updates

### Search Engine Integration

The system automatically notifies:
- **Google**: via `https://www.google.com/ping?sitemap=...`
- **Bing**: via `https://www.bing.com/ping?sitemap=...`

This ensures new projects appear in search results within hours, not days.

---

## 📁 Project Structure

```
fossradar/
├── app/                    # Next.js pages and routes
│   ├── page.tsx           # Homepage with search/filter
│   ├── about/             # About page
│   ├── radar/             # Geographic visualization dashboard
│   ├── projects/[slug]/   # Individual project pages (enhanced)
│   └── api/               # API endpoints
├── components/            # React components
│   ├── ContributorAvatars.tsx     # Contributor display
│   ├── InstallationGuide.tsx      # Quick install commands
│   ├── DocumentationLinks.tsx     # Auto-detected docs
│   ├── SimilarProjects.tsx        # Related project recommendations
│   └── ...                        # Other components
├── data/
│   ├── projects/          # Project TOML files
│   ├── tags.toml          # Allowed tags
│   └── licenses-osi.json  # OSI-approved licenses
├── lib/                   # Utilities and helpers
│   ├── github.ts          # GitHub API functions (enhanced)
│   ├── similar.ts         # Similar project matching algorithm
│   └── ...
├── scripts/               # Build and validation scripts
│   ├── enrich.ts          # Enrichment with contributor data
│   └── ...
└── public/
    ├── logos/             # Project logos
    ├── cache/             # Cached contributor & metadata (*.json)
    └── index.json         # Generated search index
```

---

## 🔑 GitHub Token Setup

### For GitHub Actions (Production)
**No setup required!** The token is automatically provided as `secrets.GITHUB_TOKEN` with the necessary permissions.

All CI/CD workflows (`validate.yml`, `enrich.yml`) automatically use this token - zero configuration needed.

### For Local Development (Optional)

Only needed if you want to test:
- Validation script (`pnpm validate`)
- Enrichment script (`pnpm enrich`)
- Auto-verification logic

**Steps:**
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scope: `public_repo` (read-only access to public repos)
4. Copy token and add to `.env`:
   ```bash
   GITHUB_TOKEN=ghp_your_token_here
   ```

**Not needed for:**
- Running dev server (`pnpm dev`)
- UI development
- Building the project
- Contributing to frontend

### OAuth Configuration (For GitHub Authentication Features)

Required for the following features to work:
- **GitHub Star Button**: One-click repository starring
- **Quick Submission Form**: Automatic PR creation

**Steps:**

1. **Create a GitHub OAuth App**
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Fill in the details:
     - Application name: `FOSSRadar Local` (or your choice)
     - Homepage URL: `http://localhost:3000` (for local dev) or your production URL
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github` (for local) or `https://yourdomain.com/api/auth/callback/github` (for production)
   - Click "Register application"
   - Copy the **Client ID**
   - Generate and copy the **Client Secret**

2. **Add to your `.env` file:**
   ```bash
   # GitHub OAuth App credentials
   GITHUB_CLIENT_ID=your_client_id_here
   GITHUB_CLIENT_SECRET=your_client_secret_here

   # NextAuth configuration
   NEXTAUTH_SECRET=your_random_secret_here  # Generate with: openssl rand -base64 32
   NEXTAUTH_URL=http://localhost:3000       # Use your production URL in production
   ```

3. **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

**Note:** For production deployment on Vercel, add these as environment variables in your project settings.

---

## 📋 Submission Requirements

### Required Fields

All fields are mandatory:

- **slug**: URL-friendly identifier (lowercase, hyphens only, 2-60 chars)
- **name**: Project display name (2-80 characters)
- **short_desc**: Brief summary (10-160 characters)
- **repo**: Public GitHub URL
- **license**: OSI-approved SPDX identifier (MIT, Apache-2.0, GPL-3.0, etc.)
- **website**: Project website URL
- **logo**: Path to logo file in `/logos/` (SVG/PNG, max 200KB)
- **primary_lang**: Main programming language
- **tags**: 1-10 tags from allowlist (see `data/tags.toml`)
- **looking_for_contributors**: Boolean (true/false)
- **location_city**: City name (2-100 characters)
- **location_indian_state**: Indian state name (2-100 characters)
- **added_at**: Submission date (YYYY-MM-DD format)

### India Connection

Describe your project's connection to India:
- **founder**: Founders/creators are from India
- **organization**: Organization based in India
- **community**: Serves Indian communities
- **contributor**: Significant India contributors

---

## 🗺️ Geographic Radar

Explore projects by location! Visit [fossradar.in/radar](https://fossradar.in/radar) to:
- View state-wise project distribution
- Discover projects in your city
- See interactive visualizations
- Find local collaborators

---

## 🤝 Community

### Get Help

- 💬 **GitHub Discussions**: Ask questions, share ideas
- 🐛 **Issues**: Report bugs or request features
- 📧 **Email**: hello@fossradar.in

### Code of Conduct

We follow the [Contributor Covenant](./CODE_OF_CONDUCT.md). Be respectful, inclusive, and constructive.

### Security

Found a security vulnerability? Please review our [Security Policy](./SECURITY.md) and report privately to security@wbfoss.org.

---

## 📊 Project Stats

- **Live Site**: [fossradar.in](https://fossradar.in)
- **Projects**: Browse all at [fossradar.in](https://fossradar.in)
- **Contributors**: [View contributors](https://github.com/wbfoss/fossradar/graphs/contributors)
- **Last Updated**: Auto-updated nightly via enrichment workflow

---

## 🗓️ Roadmap

### Current Focus
- ✅ Core directory functionality
- ✅ Automated validation and CI
- ✅ Search and filtering
- ✅ Geographic radar visualization dashboard
- ✅ Professional UI/UX with modern design
- ✅ Enhanced project pages (Phase 1 complete):
  - ✅ Contributor avatars and profiles
  - ✅ Auto-detected installation commands
  - ✅ Documentation and resource links
  - ✅ Similar project recommendations
- ✅ About page with comprehensive information
- ✅ Nightly enrichment with contributor data
- ✅ Dynamic social preview images (OpenGraph/Twitter Cards)
- 🚧 Growing the project database

### Future Plans (Phase 2+)
- 📊 Repository Health Metrics (activity timeline, PR stats, issue response time)
- 📝 Good First Issues Widget (show actual issues on project pages)
- 💬 GitHub Discussions Integration (community comments)
- 📈 Download/Installation Stats (npm, PyPI, crates.io)
- 🔒 Security & Dependency Info
- 📸 Project Screenshots Gallery
- 📱 Mobile app
- 🌐 Multi-language support (Bengali, Hindi)
- 🎥 Video demos and project spotlights
- 🏅 Gamification and contributor recognition
- 📰 Newsletter and RSS feeds

---

## ⚡ Quick Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Data Management
pnpm validate         # Validate all TOML files
pnpm run build:index  # Generate search index
pnpm enrich           # Update project metadata

# Code Quality
pnpm lint             # Run ESLint
```

---

## 📜 License

[MIT License](./LICENSE) - see LICENSE file for details.

By contributing, you agree your contributions will be licensed under MIT.

---

## 🙏 Acknowledgments

FOSSRadar.in is built by the Indian FOSS community, for the community.

**An initiative by [wbfoss](https://wbfoss.org)** - West Bengal Free and Open Source Software community.

Special thanks to:
- All project maintainers who list their projects
- Contributors who improve FOSSRadar
- The vibrant Indian open source ecosystem

---

## 🌟 Star This Repo

If you find FOSSRadar useful, give us a star! It helps others discover this project.

[![GitHub stars](https://img.shields.io/github/stars/wbfoss/fossradar?style=social)](https://github.com/wbfoss/fossradar/stargazers)

---

<div align="center">

**Built with ❤️ by the Indian FOSS community**

[Add Your Project](https://github.com/wbfoss/fossradar#-for-project-owners-get-listed) • [View All Projects](https://fossradar.in) • [Contribute](./CONTRIBUTING.md) • [Join Community](https://wbfoss.org)

</div>
