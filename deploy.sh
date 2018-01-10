#!/bin/bash
set -ex
cd $(dirname "${BASH_SOURCE[0]}")

# Install dependencies
npm install

# Compile TypeScript
npm run build

# Build image
VERSION=$(printf "%05d" $BUILDKITE_BUILD_NUMBER)_$(date +%Y-%m-%d)_$(git rev-parse --short HEAD)
docker build -t us.gcr.io/sourcegraph-dev/search-badger:$VERSION .

# Upload
gcloud docker -- push us.gcr.io/sourcegraph-dev/search-badger:$VERSION
docker tag us.gcr.io/sourcegraph-dev/search-badger:$VERSION us.gcr.io/sourcegraph-dev/search-badger:latest
gcloud docker -- push us.gcr.io/sourcegraph-dev/search-badger:latest

# Trigger Deploybot (branch is just a unique identifier)
curl http://deploy-bot.sourcegraph.com/set-branch-version -F "token=$DEPLOY_BOT_TOKEN" -F "branch=search-badger" -F "version=$VERSION" -F "user=$BUILDKITE_BUILD_CREATOR_EMAIL"
