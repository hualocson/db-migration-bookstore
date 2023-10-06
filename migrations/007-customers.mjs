// 20231006_create_customer_table.js

export async function up(client) {
    await client`
      CREATE TABLE IF NOT EXISTS public.customers (
        id serial PRIMARY KEY,
        first_name VARCHAR(200) NOT NULL,
        last_name VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL,
        address VARCHAR(200) NOT NULL,
        city VARCHAR(200) NOT NULL,
        state VARCHAR(200) NOT NULL,
        country VARCHAR(200) NOT NULL,
        postal_code VARCHAR(200) NOT NULL,
        phone_number VARCHAR(200) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ DEFAULT NULL
      )
    `;
  
    await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
    `;
    await client`
      GRANT SELECT, INSERT, UPDATE ON public.customers TO admin_access;
    `;
  
    await client`
      GRANT SELECT ON public.customers TO backend_access;
    `;
  }
  
  export async function down(client) {
    await client`
      DROP TRIGGER IF EXISTS set_timestamp ON public.customers
    `;
    await client`
      DROP TABLE IF EXISTS public.customers
    `;
  }
  