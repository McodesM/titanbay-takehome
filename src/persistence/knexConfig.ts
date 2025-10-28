import { knex, type Knex } from "knex";
import { DATABASE_URL, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from "../config";
let knexInstance: Knex | null = null;

const knexConfig: Knex.Config = {
  client: "pg", // PostgreSQL
  connection: DATABASE_URL || {
    host: POSTGRES_HOST || "localhost",
    port: POSTGRES_PORT || 5432,
    user: POSTGRES_USER || "postgres",
    password: POSTGRES_PASSWORD || "postgres",
    database: POSTGRES_DB || "appdb",
  },
  pool: { min: 2, max: 10 },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

export const getKnex = (): Knex => {
  if (!knexInstance) {
    knexInstance = knex(knexConfig);
  }
  return knexInstance;
};

export const knexClient = getKnex();