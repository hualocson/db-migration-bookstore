export async function up(client) {
  await client`
    CREATE TABLE IF NOT EXISTS public.order_items (
      id serial PRIMARY KEY,
      order_id INT REFERENCES orders(id),
      product_id INT REFERENCES products(id),
      quantity INT,
      price INT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      deleted_at TIMESTAMPTZ DEFAULT NULL
    )
  `;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.order_items
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.order_items TO admin_access;
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.order_items TO backend_access;
  `;
}

export async function down(client) {
  await client`
    DROP TRIGGER IF EXISTS set_timestamp ON public.order_items
  `;

  await client`
    DROP TABLE IF EXISTS public.order_items
  `;
}