export async function up(client) {
  await client`
    CREATE TABLE IF NOT EXISTS public.assets (
      id SERIAL PRIMARY KEY,
      cloudinary_public_id VARCHAR(200) NOT NULL,
      secure_url VARCHAR(200) NOT NULL,
      file_size INT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      deleted_at TIMESTAMPTZ DEFAULT NULL
    )
  `;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.assets
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.assets to admin_access;
  `;
  await client`
    GRANT SELECT ON public.assets to backend_access;
  `;
}

export async function down(client) {
  await client`
    DROP TRIGGER IF EXISTS set_timestamp ON public.assets
  `;
  await client`
    DROP TABLE IF EXISTS public.assets
  `;
}
