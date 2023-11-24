export async function up(client) {
  await client`
  CREATE TABLE IF NOT EXISTS public.favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES public.customers(id),
    product_id INT REFERENCES public.products(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uc_favorites UNIQUE (user_id, product_id)
  );
`;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.favorites
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.favorites to backend_access;
  `;
}

export async function down(client) {
  await client`DROP TABLE public.favorites;`;

  await client`
    DROP TRIGGER IF EXISTS set_timestamp ON public.favorites;
  `;
}
