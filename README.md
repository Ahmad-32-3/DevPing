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
