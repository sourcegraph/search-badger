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
docker push sourcegraph/search-badger:$VERSION
docker tag sourcegraph/search-badger:$VERSION sourcegraph/search-badger:latest
docker push sourcegraph/search-badger:latest
docker tag sourcegraph/search-badger:$VERSION sourcegraph/search-badger:insiders
docker push sourcegraph/search-badger:insiders
