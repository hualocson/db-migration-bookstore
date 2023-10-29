export async function up(client) {
    await client`
    CREATE TABLE IF NOT EXISTS public.book_details (
      id serial PRIMARY KEY,
      pages_number INT ,
      languages VARCHAR(50),
      author VARCHAR(200),
      author_desc VARCHAR(200),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      deleted_at TIMESTAMPTZ DEFAULT NULL
    )
  `;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.book_details
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.book_details TO admin_access;
  `;

  await client`
    GRANT SELECT, UPDATE ON public.book_details TO backend_access;
  `;
}

export async function down(client) {
    await client`
    DROP TRIGGER IF EXISTS set_timestamp ON public.book_details
  `;
  await client`
    DROP TABLE IF EXISTS public.book_details
  `;
}
