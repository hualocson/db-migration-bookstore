// 20231006_create_coupon_table.js

export async function up(client) {
  await client`
    CREATE TABLE IF NOT EXISTS public.coupons (
      id serial PRIMARY KEY,
      coupon_code VARCHAR(200) UNIQUE,
      coupon_type INT REFERENCES enums(id) ON DELETE RESTRICT,
      coupon_value INT,
      coupon_start_date TIMESTAMPTZ NOT NULL,
      coupon_end_date TIMESTAMPTZ NOT NULL,
      coupon_min_spend INT,
      coupon_max_spend INT,
      coupon_uses_per_customer INT,
      coupon_uses_per_coupon INT,
      coupon_status INT REFERENCES enums(id) ON DELETE RESTRICT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      deleted_at TIMESTAMPTZ DEFAULT NULL
    )
  `;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.coupons
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.coupons TO admin_access;
  `;

  await client`
    GRANT SELECT, UPDATE ON public.coupons TO backend_access;
  `;
}

export async function down(client) {
  await client`
    DROP TRIGGER IF EXISTS set_coupon_timestamp ON public.coupons
  `;

  await client`
    DROP TABLE IF EXISTS public.coupons
  `;
}