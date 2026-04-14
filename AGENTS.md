<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git workflow — READ THIS FIRST

This repository is deployed to `https://sweet-rebas.vercel.app` via Vercel's GitHub integration. **Never push directly to `main`.** The `main` branch is protected — it requires a reviewed pull request. Direct pushes will be rejected.

## The workflow you must follow

1. **Always work on a feature branch**, never on `main`. Before making any edit, run:
   ```bash
   git checkout main
   git pull
   git checkout -b kathleen-working   # or a task-specific name like `kathleen-hero-tweak`
   ```
   If the branch already exists, just `git checkout kathleen-working && git pull`.

2. **Commit your changes** with a clear message describing what changed and why:
   ```bash
   git add -A
   git commit -m "Describe the change in one short sentence"
   ```

3. **Push the branch** to GitHub:
   ```bash
   git push -u origin kathleen-working
   ```

4. **Vercel automatically builds a preview URL** within ~1 minute. The stable branch URL is:
   `https://sweet-rebas-git-kathleen-working-nickocs-projects.vercel.app`
   (replace `kathleen-working` with whatever branch name you used)
   Tell Kathleen this URL so she can open it in her browser and see her changes live. She can share that URL with anyone — Mike, Reba, friends — for feedback.

5. **When Kathleen is happy with the changes**, open a pull request against `main`:
   ```bash
   gh pr create --base main --head kathleen-working --title "Short description" --body "What changed and why"
   ```
   Nick will review the preview URL, approve, and merge. Only then does `sweet-rebas.vercel.app` update.

## Git identity — IMPORTANT

Vercel's Hobby tier rejects deployments from git authors who aren't on the team. Before your first commit in a fresh clone, configure git to commit as Nick:

```bash
git config user.name "Sweet Rebas Bot"
git config user.email "nickoc123@gmail.com"
```

Run this once per cloned copy of the repo. Without it, pushes will succeed but Vercel previews will fail to build.

## Rollback

To undo the latest change on a branch without losing history, use `git revert HEAD` and push the revert commit. Never force-push — it's blocked on `main` and discouraged on feature branches.

## Quick reference

- **Production site:** https://sweet-rebas.vercel.app (only updates when a PR is merged to `main`)
- **Preview pattern:** https://sweet-rebas-git-{BRANCH}-nickocs-projects.vercel.app
- **Default working branch:** `kathleen-working`
- **Required before commit:** `git config user.email "nickoc123@gmail.com"`
