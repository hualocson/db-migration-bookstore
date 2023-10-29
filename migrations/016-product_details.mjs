export async function up(client) {
  await client`
    CREATE TABLE IF NOT EXISTS public.product_details (
      id SERIAL PRIMARY KEY,
      pages INT,
      author VARCHAR(200),
      publisher VARCHAR(200),
      publication_date TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      FOREIGN KEY (id) REFERENCES products(id)
    );
  `;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.product_details
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.product_details to admin_access;
  `;

  await client`
    GRANT SELECT ON public.product_details to backend_access;
  `;
}

export async function down(client) {
  await client`
    DROP TRIGGER IF EXISTS set_timestamp ON public.product_details
  `;
  await client`
    DROP TABLE IF EXISTS public.product_details
  `;
}
