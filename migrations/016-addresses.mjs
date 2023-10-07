export async function up(client) {
  await client`
      CREATE TABLE IF NOT EXISTS public.addresses (
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL,
        street_address VARCHAR(200),
        city VARCHAR(200),
        state VARCHAR(20),
        postal_code VARCHAR(20),
        country VARCHAR(200),
        FOREIGN KEY (customer_id) REFERENCES customers(id)
    );
  `;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.addresses
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.addresses TO admin_access;
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.addresses TO backend_access;
  `;
}

export async function down(client) {
  await client`
    DROP TRIGGER IF EXISTS set_timestamp ON public.addresses
  `;
  await client`
    DROP TABLE IF EXISTS public.addresses
  `;
}
