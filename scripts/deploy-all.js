const { execSync } = require('child_process');

console.log('🛠️  Deploying contracts...');
execSync('npx hardhat deploy --network somniaTestnet', { stdio: 'inherit' });

console.log('🔍 Verifying contracts...');
execSync('npx hardhat verify --network somniaTestnet', { stdio: 'inherit' });

console.log('🚀 Deploying frontend...');
execSync('cd frontend && npm run deploy', { stdio: 'inherit' });
