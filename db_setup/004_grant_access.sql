-- Grant rights to backend_access
GRANT USAGE ON SCHEMA public TO backend_access;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO backend_access;
-- Automatically grant access to new tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE ON TABLES TO backend_access;

-- Grant rights to admin_access to public schema
GRANT USAGE ON SCHEMA public TO admin_access;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO admin_access;
-- Automatically grant access to new tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO admin_access;

-- Grant rights to admin_access to admin schema
GRANT USAGE ON SCHEMA admin TO admin_access;
GRANT CREATE ON SCHEMA admin TO admin_access;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA admin TO admin_access;
ALTER DEFAULT PRIVILEGES IN SCHEMA admin GRANT SELECT, INSERT, UPDATE ON TABLES TO admin_access;