# Project Setup

## Prerequisites
- Node.js (v20 or later)
- npm (v10 or later)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for running PostgreSQL)

---

## How to Run the Server

```bash
# 1. Install dependencies
npm i

# 2. Build the project
npm run build

# 3. Start the server
npm start

---
```
## How to Run the Db

```bash
# 1. Start PostgreSQL in Docker
npm run db:up

# 2. Apply schema
npm run db:schema

```
## Shutting db down

```bash
# 1. Shutdown PostgreSQL in Docker
npm run db:down

```