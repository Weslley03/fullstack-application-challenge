import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

const config: Knex.Config = {
  client: process.env.DB_CLIENT || 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'weslley03',
    database: process.env.DB_DATABASE_NAME || 'educational-institution',
  },
};
export default config;
