const fs = require('fs');
const content = fs.readFileSync('/home/bilalsalama/00-RoadMap/js/backendStages.js', 'utf8');

// Find all stage IDs
const stagePattern = /id:\s*"(backend-stage-\d+)"/g;
const ids = [];
let match;
while ((match = stagePattern.exec(content)) !== null) {
  ids.push(match[1]);
}

console.log('=== STAGE ID VERIFICATION ===');
console.log('Total stages found:', ids.length);
console.log();

// Check slice results
console.log('slice(0, 5):', ids.slice(0, 5));
console.log('slice(5, 11):', ids.slice(5, 11));
console.log('slice(11, 25):', ids.slice(11, 25));
console.log('slice(25, 28):', ids.slice(25, 28));
console.log('slice(28, 38):', ids.slice(28, 38));
console.log();

// Extract titles for each stage
const titlePattern = /id:\s*"(backend-stage-\d+)"[\s\S]*?title:\s*"([^"]+)"/g;
const stages = {};
while ((match = titlePattern.exec(content)) !== null) {
  stages[match[1]] = match[2];
}

console.log('Stage IDs and Titles:');
ids.forEach((id, idx) => {
  console.log('Index', idx, ':', id, '-', stages[id]);
});