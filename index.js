// Import required dependencies
require('dotenv').config();
const { Octokit } = require('@octokit/rest');
// For Node.js v18+ native fetch can be used, but keeping node-fetch for compatibility
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Initialize Octokit with Personal Access Token (PAT)
const octokit = new Octokit({ auth: process.env.PAT });

/**
 * Configuration for the GitHub bot
 * These can be moved to environment variables for more flexibility
 */
const CONFIG = {
  // Repository details
  owner: process.env.REPO_OWNER || 'Ahmad15523',
  repo: process.env.REPO_NAME || 'github-actions-bot',
  // Reviewers to assign (can be configured per repository or project)
  reviewers: (process.env.REVIEWERS || 'Ahmad15523').split(',').map(reviewer => reviewer.trim()),
  // Slack webhook URL for notifications
  slackWebhookUrl: process.env.SLACK
};

/**
 * Assigns reviewers to a pull request
 * @param {number} prNumber - The number of the pull request
 * @returns {Promise<void>}
 */
async function autoAssignReviewers(prNumber) {
  try {
    console.log(`Attempting to assign reviewers ${CONFIG.reviewers.join(', ')} to PR #${prNumber}`);
    
    await octokit.pulls.requestReviewers({
      owner: CONFIG.owner,
      repo: CONFIG.repo,
      pull_number: prNumber,
      reviewers: CONFIG.reviewers
    });
    
    console.log(`Successfully assigned reviewers to PR #${prNumber}`);
  } catch (error) {
    console.error(`Error assigning reviewers to PR #${prNumber}:`, error.message);
    // Additional error details for debugging
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Response body:`, error.response.data);
    }
    throw error; // Re-throw to handle it at a higher level if needed
  }
}

/**
 * Sends a notification to Slack
 * @param {string} message - The message to send to Slack
 * @returns {Promise<void>}
 */
async function sendSlackNotification(message) {
  try {
    if (!CONFIG.slackWebhookUrl) {
      console.warn('Slack webhook URL not configured. Skipping notification.');
      return;
    }
    
    const response = await fetch(CONFIG.slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send Slack notification: ${response.statusText}`);
    }
    
    console.log('Successfully sent Slack notification');
  } catch (error) {
    console.error('Error sending Slack notification:', error.message);
  }
}

/**
 * Handles a pull request event from GitHub Actions
 * @param {Object} event - The GitHub event object
 * @returns {Promise<void>}
 */
async function handlePullRequest(event) {
  try {
    if (!event || !event.pull_request) {
      throw new Error('Invalid event object: Missing pull_request data');
    }
    
    const prNumber = event.pull_request.number;
    const prUrl = event.pull_request.html_url;
    const prTitle = event.pull_request.title;
    const prAuthor = event.pull_request.user.login;
    
    console.log(`Processing PR #${prNumber}: "${prTitle}" by ${prAuthor}`);
    
    // Don't assign the PR author as a reviewer
    const filteredReviewers = CONFIG.reviewers.filter(reviewer => reviewer !== prAuthor);
    
    if (filteredReviewers.length > 0) {
      CONFIG.reviewers = filteredReviewers;
      await autoAssignReviewers(prNumber);
    } else {
      console.log(`No eligible reviewers found for PR #${prNumber} (excluding author)`);
    }
    
    // Create a more informative Slack message
    const slackMessage = `🚀 New PR #${prNumber} "${prTitle}" opened by ${prAuthor}\n${prUrl}`;
    await sendSlackNotification(slackMessage);
    
    return { success: true, message: `Successfully processed PR #${prNumber}` };
  } catch (error) {
    console.error('Error handling pull request:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Main function to process GitHub webhook events
 * @param {Object} event - The GitHub event object
 * @param {string} eventName - The name of the event (e.g., 'pull_request')
 * @returns {Promise<Object>} - Result of the operation
 */
async function processWebhookEvent(event, eventName) {
  console.log(`Processing ${eventName} event`);
  
  switch (eventName) {
    case 'pull_request':
      return await handlePullRequest(event);
    // Additional event types can be handled here
    default:
      console.log(`Event type ${eventName} not supported`);
      return { success: false, message: `Event type ${eventName} not supported` };
  }
}

// Export functions for use in GitHub Actions
module.exports = {
  handlePullRequest,
  processWebhookEvent,
  autoAssignReviewers,
  sendSlackNotification
};