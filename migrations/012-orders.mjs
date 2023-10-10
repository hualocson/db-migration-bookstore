export async function up(client) {
  await client`
    CREATE TABLE IF NOT EXISTS public.orders (
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES customers(id),
      status INT REFERENCES enums(id) ON DELETE RESTRICT,
      shipping_fee INT,
      total INT NOT NULL,
      address_id INT REFERENCES addresses(id),
      coupon_id INT REFERENCES coupons(id),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      deleted_at TIMESTAMPTZ DEFAULT NULL,
      canceled_at TIMESTAMPTZ DEFAULT NULL,
      completed_at TIMESTAMPTZ DEFAULT NULL,
      delivery_at TIMESTAMPTZ DEFAULT NULL
    )
  `;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.orders TO admin_access;
  `;

  await client`
    GRANT SELECT, UPDATE, INSERT ON public.orders TO backend_access;
  `;
}

export async function down(client) {
  await client`
    DROP TRIGGER IF EXISTS set_timestamp ON public.orders
  `;

  await client`
    DROP TABLE IF EXISTS public.orders
  `;
}