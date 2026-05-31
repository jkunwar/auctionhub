-- This file runs automatically the first time the Postgres container starts.
-- It sets up useful extensions that our app will use.

-- uuid-ossp: lets us generate UUIDs (unique IDs) for database records
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- pg_trgm: enables fast fuzzy text search (used for listing search)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
