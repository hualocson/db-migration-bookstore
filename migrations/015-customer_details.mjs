export async function up(client) {
  await client`
      CREATE TABLE IF NOT EXISTS public.customer_details (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(20),
        last_name VARCHAR(20),
        phone_number VARCHAR(20),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ DEFAULT NULL,
        FOREIGN KEY (id) REFERENCES customers(id)
    );
  `;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.customer_details
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;


  await client`
    GRANT SELECT, INSERT, UPDATE ON public.customer_details TO admin_access;
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.customer_details TO backend_access;
  `;
}

export async function down(client) {
  await client`
    DROP TRIGGER IF EXISTS set_timestamp ON public.customer_details
  `;
  await client`
    DROP TABLE IF EXISTS public.customer_details
  `;
}
