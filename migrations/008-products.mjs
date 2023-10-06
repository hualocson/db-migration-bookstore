export async function up(client) {
    await client`
      CREATE TABLE IF NOT EXISTS public.products (
        id SERIAL PRIMARY KEY,
        category_id INT REFERENCES public.categories(id) ON DELETE CASCADE,
        name VARCHAR(200) NOT NULL,
        slug VARCHAR(200) NOT NULL UNIQUE,
        description TEXT,
        price INT,
        quantity INT NOT NULL,
        sold INT DEFAULT 0,
        image VARCHAR(200),
        status INT REFERENCES enums(id) ON DELETE RESTRICT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ DEFAULT NULL
      );
    `;

    await client`
      CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON public.products
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();
    `;

    await client`
      GRANT SELECT, INSERT, UPDATE ON public.products to admin_access;
    `;

    await client`
      GRANT SELECT ON public.products to backend_access;
    `;
  }

  export async function down(client) {
    await client`
      DROP TRIGGER IF EXISTS set_timestamp ON public.products
    `;
    await client`
      DROP TABLE IF EXISTS public.products
    `;
  }
