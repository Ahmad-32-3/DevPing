 ReviewFlow: The GitHub PR Automation Bot

## Overview
ReviewFlow is a GitHub Actions–based bot designed to automate key repository management tasks. It streamlines the pull request review process by automatically assigning reviewers and sending notifications to your Slack channel whenever a pull request is created. By reducing manual intervention, ReviewFlow helps ensure that pull requests receive timely attention and that your team stays informed throughout the development process.

## Features
- **Automatic Reviewer Assignment:** When a pull request is opened, updated, or reopened, ReviewFlow automatically assigns specified reviewers, ensuring that your code is promptly reviewed.
- **Slack Notifications:** The bot sends clear, detailed notifications to a designated Slack channel whenever a new pull request is created.
- **CI/CD Integration:** Integrated into your GitHub Actions pipeline, ReviewFlow runs automatically on pull request events with no extra effort from you.
- **Extensible Design:** The architecture allows for future enhancements, such as additional automated tasks or customized notification formats.

## Prerequisites
Before you set up ReviewFlow, ensure that you have:
- A GitHub account with the necessary repository permissions.
- A Slack workspace and a valid Slack webhook URL.
- A GitHub Personal Access Token (PAT) with the required permissions (at minimum, the token should have "repo" and "pull_requests" scopes). Note that the built-in `GITHUB_TOKEN` does not provide sufficient privileges for assigning reviewers.
- Basic familiarity with Git, GitHub Actions, and managing repository secrets.

## Setup and Installation

### 1. Clone the Repository
Open your terminal and run:
```sh
git clone https://github.com/YOUR_USERNAME/github-actions-bot.git
cd github-actions-bot

Replace YOUR_USERNAME with your GitHub username.

2. Configure GitHub Secrets
In your GitHub repository, navigate to Settings → Secrets and Variables → Actions. Create or update the following secrets:

PAT: Your GitHub Personal Access Token. Ensure this token has "repo" and "pull_requests" permissions.
SLACK: Your Slack webhook URL.
The secret names must match exactly as referenced in the workflow file.

3. Review and Customize the Workflow File
The GitHub Actions workflow is defined in the .github/workflows/ directory. It includes the following steps:

Assigning Reviewers: A curl command is used with your PAT to request reviewers for pull requests.
Sending Slack Notifications: The workflow uses the rtCamp/action-slack-notify@v2 action to notify your team about new pull requests.
Examine the workflow file and modify it as needed, especially the reviewer usernames and Slack channel settings.

4. Commit and Push Your Changes
After configuring your workflow and secrets, commit and push your changes:

sh
Copy
Edit
git add .
git commit -m "Setup ReviewFlow bot"
git push origin main
Usage
After ReviewFlow is set up:

When you create or update a pull request in your repository, the workflow will trigger automatically.
The bot will assign the specified reviewers to the pull request.
A notification with pull request details will be sent to your configured Slack channel.
You can monitor the workflow logs in the GitHub Actions tab to confirm that everything is running correctly.
Troubleshooting
Bad Credentials Error: Ensure that your PAT is correctly configured in GitHub Secrets and has the necessary permissions.
Missing Slack Notification: Verify that your Slack webhook URL is correct and that the secret name in your workflow matches.
Workflow Not Triggering: Confirm that the pull request events (opened, synchronize, reopened) are correctly defined in your workflow.