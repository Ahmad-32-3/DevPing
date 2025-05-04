# DevPing: GitHub PR Automation Bot

## Overview

DevPing is a GitHub Actions–powered bot that helps your team stay on top of pull requests.  
It automatically assigns reviewers and sends Slack notifications, reducing manual effort and helping your team work more efficiently.

---

## Features

- **Automatic reviewer assignment** when a pull request is opened, updated, or reopened.
- **Slack notifications** for new pull requests sent directly to your configured channel.
- **Seamless GitHub Actions integration** — no external setup or services required.
- **Fully customizable** for your team’s needs, including reviewer lists and notification formatting.

---

## Requirements

Before setting up DevPing, make sure you have:

- A GitHub repository with admin or write access.
- A Slack workspace with an active Slack **Incoming Webhook URL**.
- A GitHub **Personal Access Token (PAT)** with:
  - `repo` scope (repository access)
  - `pull_requests` scope (for assigning reviewers)

> **Note:** GitHub’s built-in `GITHUB_TOKEN` does **not** have permission to assign reviewers.

---

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/github-actions-bot.git
cd github-actions-bot
Replace YOUR_USERNAME with your GitHub username.

2. Add Required Secrets
In your GitHub repository:

Go to Settings → Secrets and Variables → Actions.

Add these two secrets:

GITHUB_PAT → your personal GitHub token.

SLACK_WEBHOOK_URL → your Slack webhook URL.

Make sure these secret names match what’s referenced in the workflow.

3. Review the Workflow
Open the workflow file:

bash
Copy
.github/workflows/bot.yml
By default, the workflow:

Assigns reviewers using the GitHub API.

Sends Slack notifications with pull request details.

You can customize:

Which reviewers are assigned.

How the Slack message is formatted.

4. Commit and Push Your Changes
bash
Copy
git checkout -b newBranch
git add .
git commit -m "Set up DevPing bot"
git push origin newBranch
How It Works
Once set up:

When you open or update a pull request, the workflow automatically triggers.

Reviewers are assigned based on your configuration.

A Slack notification is sent with pull request details.

You can monitor the workflow under the Actions tab in your GitHub repository.
