# FOSSRadar.in

> **Discover and showcase open source projects from India**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

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

**Step 1: Add the `fossradar` topic to your GitHub repository**

Go to your repo → About section → ⚙️ Settings → Add `fossradar` to topics

**Step 2: Fork this repository**

Click the "Fork" button at the top of this page

**Step 3: Create your project TOML file**

Create a file `data/projects/your-project-slug.toml` (replace `your-project-slug` with your actual project slug):

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
- 🗺️ **Geographic Radar**: Explore projects by state and city across India
- ⭐ **Featured Projects**: Curated showcase of exceptional projects
- 🌙 **Dark Mode**: Easy on the eyes, system-aware theme
- 📱 **Responsive**: Perfect experience on mobile, tablet, and desktop

### For Project Owners

- ✅ **Verified Status**: Auto-verification for project affiliates
- 📊 **Auto-Updated Stats**: Stars, language, and contributor info updated nightly
- 🎯 **Looking for Contributors**: Flag projects actively seeking help
- 🗺️ **Location Tracking**: Show your project's geographic presence
- 🏆 **Featured Listings**: Opportunity to be highlighted

### Technical Features

- **Git as Database**: All data version-controlled in TOML files
- **No Runtime DB**: Fast, simple, auditable
- **Auto-Validation**: CI checks every submission
- **GitHub Integration**: OAuth, webhooks, API
- **SEO Optimized**: Sitemaps, structured data, OpenGraph

---

## 🏗️ Tech Stack

Built with modern, performant technologies:

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Fonts**: VT323 (logo), Share Tech (headings), Inter (body)
- **Search**: Fuse.js (client-side fuzzy search)
- **Validation**: Zod schemas
- **Deployment**: Vercel (recommended)
- **Data**: TOML files in Git

---

## 📁 Project Structure

```
fossradar/
├── app/                    # Next.js pages and routes
│   ├── page.tsx           # Homepage with search/filter
│   ├── radar/             # Geographic visualization
│   ├── projects/[slug]/   # Individual project pages
│   └── api/               # API endpoints
├── components/            # React components
├── data/
│   ├── projects/          # Project TOML files
│   ├── tags.toml          # Allowed tags
│   └── licenses-osi.json  # OSI-approved licenses
├── lib/                   # Utilities and helpers
├── scripts/               # Build and validation scripts
└── public/
    ├── logos/             # Project logos
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
- ✅ Geographic radar visualization
- ✅ Supabase-inspired UI/UX
- 🚧 Growing the project database

### Future Plans
- 📱 Mobile app
- 🌐 Multi-language support (Bengali, Hindi)
- 📊 Analytics dashboard for project owners
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
