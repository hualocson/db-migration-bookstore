export async function up(client) {
  await client`
    CREATE TABLE IF NOT EXISTS public.categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      slug VARCHAR(200) NOT NULL UNIQUE,
      parent_id INT,
      description TEXT,
      image VARCHAR(200),
      status INT REFERENCES enums(id) ON DELETE RESTRICT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      deleted_at TIMESTAMPTZ DEFAULT NULL,
      FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE SET NULL
    )
  `;

  await client`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await client`
    GRANT SELECT, INSERT, UPDATE ON public.categories to admin_access;
  `;

  await client`
    GRANT SELECT ON public.categories to backend_access;
  `;
}

export async function down(client) {
  await client`
    DROP TRIGGER IF EXISTS set_timestamp ON public.categories
  `;
  await client`
    DROP TABLE IF EXISTS public.categories
  `;
}
