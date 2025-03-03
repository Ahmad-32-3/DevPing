require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const fetch = require('node-fetch');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Testing Pull Request
console.log("Hello World");

const REPO_OWNER = 'Ahmad15523';  
const REPO_NAME = 'github-actions-bot';
const REVIEWERS = ['Ahmad15523'];  

async function autoAssignReviewers(prNumber) {
    await octokit.pulls.requestReviewers({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        pull_number: prNumber,
        reviewers: REVIEWERS
    });
    console.log(`Assigned reviewers to PR #${prNumber}`);
}

async function sendSlackNotification(message) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
    });
    console.log('Sent Slack notification');
}

async function handlePullRequest(event) {
    const prNumber = event.pull_request.number;
    await autoAssignReviewers(prNumber);
    await sendSlackNotification(`🚀 PR #${prNumber} opened: ${event.pull_request.html_url}`);
}

module.exports = { handlePullRequest };
