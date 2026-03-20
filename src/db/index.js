/**
 * @fileoverview PostgreSQL Connection Pool
 * @description Richtet den pg.Pool ein und exportiert ihn für alle Services.
 *   Verbindung läuft über Unix-Socket mit Peer-Authentifizierung.
 * @module src/db/index
 */
import pg from "pg";

export const pool = new pg.Pool({
  host: process.env.PGHOST ?? "/var/run/postgresql",
  port: process.env.PGPORT,
  database: process.env.PGDATABASE ?? "linkshort",
  user: process.env.PGUSER ?? "dev2k",
  password: process.env.PGPASSWORD,
});
