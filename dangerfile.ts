import { message, danger, warn, markdown } from "danger";

const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR: \n - " + modifiedMD);

// Add a CHANGELOG entry for app changes
const hasChangelog = danger.git.modified_files.includes("changelog.md")

if (!hasChangelog) {
  warn("Please add a changelog entry for your changes.")
}

// Check changes is under threshold
const bigPRThreshold = 50;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(':exclamation: Big PR');
  markdown('> Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.');
}
