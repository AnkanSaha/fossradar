# PR Workflow with Auto-Verification

## Overview

FOSSRadar.in offers **two submission methods** for project owners:

1. **Quick Submission Form**: An interactive 5-step form that automatically creates pull requests (recommended for most users)
2. **Manual PR Workflow**: Traditional Git workflow for developers who prefer direct control

Both methods result in a GitHub Pull Request with automatic verification.

## Key Features

### 🚀 Two Submission Options
- **Quick Form**: Guided submission with auto-fill and validation
- **Manual PR**: Traditional Git workflow with full control
- Both create GitHub PRs for community review
- Full Git history and transparency

### ✅ Auto-Verification
When you submit a project via PR, our CI **automatically checks** if you're affiliated with the project repository:

1. **Repository Owner**: You own the repository
2. **Organization Member**: You're a member of the organization that owns the repo
3. **Collaborator**: You have write access to the repository
4. **Contributor**: You have commits in the repository

If **any** of the above is true → **Verified ✓**

---

## How It Works

### Method 1: Quick Submission Form (Recommended)

#### Overview
Visit [fossradar.in/submit/form](https://fossradar.in/submit/form) for a guided submission experience.

#### Features
- ✨ Auto-fetch project details from GitHub
- ✅ Real-time validation with helpful guidance
- 🔍 Duplicate detection prevents resubmissions
- 🏷️ Smart tag suggestions from GitHub topics
- 🖼️ Optional logo upload (drag & drop)
- 📝 TOML preview before submission
- 🤖 Automatic PR creation

#### Steps
1. Visit [fossradar.in/submit/form](https://fossradar.in/submit/form)
2. Enter your GitHub repository URL and validate
3. Fill in the 5-step guided form (most fields auto-filled)
4. Review the generated TOML file
5. Sign in with GitHub
6. Submit - we create the PR automatically!

**Note**: Requires GitHub authentication to create pull requests on your behalf. The form uses GitHub OAuth to authenticate and create the PR using your GitHub account.

#### Auto-Verification
After form submission, the PR undergoes the same auto-verification process as manual PRs (see below).

---

### Method 2: Manual PR Workflow (Traditional)

#### For Project Owners

#### Step 1: Prepare Your Repository
```bash
# Add the fossradar topic to your GitHub repository
# Go to your repository on GitHub
# Click About → Settings → Add topic: fossradar
```

#### Step 2: Fork FOSSRadar
```bash
# Fork the repository on GitHub
https://github.com/wbfoss/fossradar

# Clone your fork
git clone https://github.com/your-github-username/fossradar.git
cd fossradar
```

#### Step 3: Create Your Project File
```bash
# Create a new TOML file
cat > data/projects/my-awesome-project.toml << 'EOF'
slug = "my-awesome-project"
name = "My Awesome Project"
short_desc = "A brief description of what my project does (10-160 chars)"
repo = "https://github.com/yourusername/yourproject"
license = "MIT"
added_at = "2025-11-09"

primary_lang = "TypeScript"
tags = ["web", "typescript", "nextjs"]
looking_for_contributors = true

# India connection
india_connection = "founder"
india_connection_details = "Created by developers from India"
EOF
```

#### Step 4: Commit and Push
```bash
git add data/projects/my-awesome-project.toml
git commit -m "feat: add my-awesome-project"
git push origin main
```

#### Step 5: Create Pull Request
1. Go to your fork on GitHub
2. Click "Contribute" → "Open pull request"
3. Fill in the PR template
4. Submit!

#### Step 6: Auto-Verification
Our CI will automatically:
1. Validate your TOML file
2. Check if your repo has the `fossradar` topic
3. Verify tags and license
4. **Check your affiliation with the project**
5. If affiliated → mark as `verified = true`

---

## Verification Logic

### Script: `scripts/verify-pr-author.ts`

The verification script checks multiple levels of affiliation:

```typescript
// Checks performed:
1. Repository Owner
   - PR author's username === repo owner's username

2. Organization Member
   - If repo is owned by an org, check if PR author is a member

3. Collaborator
   - Check if PR author has write/admin access to the repo

4. Contributor
   - Check if PR author has commits in the repository
```

### How It's Called

In `.github/workflows/validate.yml`:

```yaml
- name: Verify PR author affiliation
  run: |
    # Get changed TOML files
    CHANGED_FILES=$(git diff --name-only ...)

    # For each changed project
    for file in $CHANGED_FILES; do
      SLUG=$(basename "$file" .toml)
      tsx scripts/verify-pr-author.ts "$PR_AUTHOR" "$SLUG"
    done

    # If affiliated, script updates verified = true
    git commit -m "chore: update verification status"
```

---

## Example Scenarios

### Scenario 1: Repository Owner Submits
```
PR Author: @alice
Repository: github.com/alice/awesome-tool

Verification:
✅ Repository Owner: Yes (alice owns alice/awesome-tool)
✅ Organization Member: N/A
✅ Collaborator: Yes (implicit as owner)
✅ Contributor: Yes (likely has commits)

Result: verified = true
```

### Scenario 2: Org Member Submits
```
PR Author: @bob
Repository: github.com/wbfoss/cool-project

Verification:
❌ Repository Owner: No (owned by wbfoss)
✅ Organization Member: Yes (bob is in wbfoss)
✅ Collaborator: Yes (org members have access)
✅ Contributor: Maybe

Result: verified = true
```

### Scenario 3: Contributor Submits
```
PR Author: @charlie
Repository: github.com/alice/awesome-tool

Verification:
❌ Repository Owner: No (owned by alice)
❌ Organization Member: N/A
❌ Collaborator: No (no write access)
✅ Contributor: Yes (has commits in the repo)

Result: verified = true
```

### Scenario 4: Unaffiliated Submission
```
PR Author: @dave
Repository: github.com/alice/awesome-tool

Verification:
❌ Repository Owner: No
❌ Organization Member: N/A
❌ Collaborator: No
❌ Contributor: No (no commits)

Result: verified = false
```

---

## Verified Badge

### On FOSSRadar
Projects marked as `verified = true` display a **Verified ✓** badge:

```tsx
{project.verified && (
  <span className="verified-badge">
    <CheckIcon /> Verified
  </span>
)}
```

### On Your Project README
Once verified, add the badge to your project README:

```markdown
[![fossradar.in: Verified](https://img.shields.io/badge/fossradar.in-Verified-brightgreen?style=for-the-badge)](https://fossradar.in/projects/your-slug)
```

This badge shows:
- ✅ Project is in FOSSRadar directory
- ✅ Submitted by affiliated member
- ✅ India connection verified

---

## Benefits of This Approach

### 1. **Quality Control**
- Only developers who can create PRs can submit
- Community can review before merging
- Full Git history for accountability

### 2. **Automatic Verification**
- No manual verification needed
- Instant verification for affiliated members
- Transparent verification criteria

### 3. **Trust & Transparency**
- Clear verification logic
- Public GitHub profile checks
- Auditable process

### 4. **No External Auth**
- No OAuth setup required
- No user data storage
- GitHub-native workflow

### 5. **Developer-Friendly**
- Familiar Git workflow
- No forms to fill out
- Quick submission process

---

## Troubleshooting

### My project isn't marked as verified

**Check:**
1. Are you the repository owner?
2. Are you a member of the organization?
3. Do you have write access to the repository?
4. Do you have commits in the repository?

If **none** of the above, you're not affiliated. Ask an affiliated member to submit the PR.

### How do I get verified after initial submission?

If your project was submitted by someone else and is unverified:
1. Create a PR updating any field in your project's TOML file
2. CI will re-run verification
3. If you're now affiliated, it will be marked verified

### Can I verify someone else's project?

No. The verification is automatic based on **PR author** affiliation with the **project repository**. You can only get verified for projects you're affiliated with.

---

## Security Considerations

### Why This Is Secure

1. **GitHub API Verification**: All checks use official GitHub API
2. **Read-Only Checks**: We only read public information
3. **No Spoofing**: Can't fake being a repo owner/member
4. **Transparent**: All verification happens in public CI logs

### What We Check

- Public repository ownership
- Public organization membership
- Public collaborator status
- Public commit history

### What We Don't Check

- Private repositories
- Private organization details
- Email addresses
- Other personal information

---

## FAQ

**Q: Should I use the Quick Form or Manual PR workflow?**
A: Use the Quick Form for faster, guided submission with auto-fill. Use Manual PR workflow if you prefer direct Git control or want to batch multiple projects.

**Q: Does the Quick Form still create a PR?**
A: Yes! Both methods create GitHub Pull Requests for community review and transparency.

**Q: What if I'm not a developer?**
A: You can still use the Quick Form - it only requires a GitHub account. For manual workflow, ask the project maintainer to submit it.

**Q: Can I submit a project I don't own?**
A: Yes, but it won't be verified unless submitted by an affiliated member.

**Q: How long does verification take?**
A: Instant! CI runs automatically on PR creation.

**Q: Can verification be revoked?**
A: Yes, if you lose affiliation (leave org, lose access), re-running CI will update status.

---

## Technical Details

### Environment Variables Required

```bash
GITHUB_TOKEN=ghp_your_token  # Required for API calls
```

The token needs:
- `public_repo` scope
- Read access to organization membership (public)
- Read access to repository collaborators (public)

### Rate Limiting

GitHub API has rate limits:
- **Authenticated**: 5,000 requests/hour
- **Unauthenticated**: 60 requests/hour

Our verification script makes ~4 API calls per project:
- Get repository
- Check org membership (if applicable)
- Check collaborator status
- List contributors

For typical PRs (1-2 projects), we're well within limits.

---

## Summary

FOSSRadar offers two submission methods with auto-verification:

**Quick Submission Form:**
- ✅ Guided 5-step process with auto-fill
- ✅ Real-time validation and duplicate detection
- ✅ Smart tag suggestions from GitHub topics
- ✅ Automatic PR creation via GitHub OAuth
- ✅ Perfect for quick, single-project submissions

**Manual PR Workflow:**
- ✅ Full Git control for developers
- ✅ Batch multiple project submissions
- ✅ Traditional workflow for Git users
- ✅ No OAuth required

**Both methods:**
- ✅ Create GitHub Pull Requests for community review
- ✅ Automatically verify project ownership
- ✅ Maintain full transparency
- ✅ Scalable and secure
