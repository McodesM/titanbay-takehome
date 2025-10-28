# Project Setup

## Prerequisites
- Node.js (v20 or later)
- npm (v10 or later)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for running PostgreSQL)

---

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

## API Spec


### **Funds**

| Method | Endpoint | Description |
|---------|-----------|--------------|
| **GET** | `/funds` | List all funds |
| **GET** | `/funds/{id}` | Get a specific fund by ID |
| **POST** | `/funds` | Create a new fund |
| **PUT** | `/funds` | Update an existing fund |

**Example Response – GET /funds**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Titanbay Growth Fund I",
    "vintage_year": 2024,
    "target_size_usd": 250000000,
    "status": "Fundraising",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```
## **Investors**

| Method   | Endpoint     | Description           |
| -------- | ------------ | --------------------- |
| **GET**  | `/investors` | List all investors    |
| **POST** | `/investors` | Create a new investor |

**Example Response – GET /investors**
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "name": "Goldman Sachs Asset Management",
    "investor_type": "Institution",
    "email": "investments@gsam.com",
    "created_at": "2024-02-10T09:15:00Z"
  }
]
```
### **Investments**


| Method   | Endpoint                       | Description                              |
| -------- | ------------------------------ | ---------------------------------------- |
| **GET**  | `/funds/{fund_id}/investments` | List all investments for a specific fund |
| **POST** | `/funds/{fund_id}/investments` | Create a new investment for a fund       |

**Example Response – GET /investments**
```json
[
  {
    "id": "990e8400-e29b-41d4-a716-446655440004",
    "investor_id": "770e8400-e29b-41d4-a716-446655440002",
    "fund_id": "550e8400-e29b-41d4-a716-446655440000",
    "amount_usd": 50000000.00,
    "investment_date": "2024-03-15"
  }
]
```

BaseUrl = http://localhost:3000
