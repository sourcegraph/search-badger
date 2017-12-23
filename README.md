# Sourcegraph Search Badger

[![build](https://badge.buildkite.com/6cec350252eacb2fea1dc294885188a2e212d9750165fe97e8.svg)](https://buildkite.com/sourcegraph/search-badger)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

NodeJS microservice for serving Sourcegraph search count badges.

## Query Parameters

| Name    | Description                                           |
| ------- | ----------------------------------------------------- |
| `query` | The search query to execute                           |
| `label` | The text on the left side (default: the search query) |

## Develop

```sh
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start server
npm start
```

## Environment Variables

| Name      | Default                                |
| --------- | -------------------------------------- |
| `API_URL` | `https://sourcegraph.com/.api/graphql` |

---

![Badger](https://upload.wikimedia.org/wikipedia/commons/1/10/Badger-badger.jpg)
