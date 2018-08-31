#!/bin/bash
set -ex
cd $(dirname "${BASH_SOURCE[0]}")

# Install dependencies
npm install

# Compile TypeScript
npm run build

# Remove all devDependencies from node_modules for a slim Docker image
npm prune --production

# Build image
VERSION=$(printf "%05d" $BUILDKITE_BUILD_NUMBER)_$(date +%Y-%m-%d)_$(git rev-parse --short HEAD)
docker build -t sourcegraph/search-badger:$VERSION .

# Upload
gcloud docker -- push sourcegraph/search-badger:$VERSION
docker tag sourcegraph/search-badger:$VERSION sourcegraph/search-badger:latest
gcloud docker -- push sourcegraph/search-badger:latest

# Trigger Deploybot (branch is just a unique identifier)
curl http://deploy-bot.sourcegraph.com/set-branch-version -F "token=$DEPLOY_BOT_TOKEN" -F "branch=search-badger" -F "version=$VERSION" -F "user=$BUILDKITE_BUILD_CREATOR_EMAIL"
