// 20231006_create_customer_table.js

export async function up(client) {
    await client`
      CREATE TABLE IF NOT EXISTS public.customers (
        id serial PRIMARY KEY,
        email VARCHAR(200) NOT NULL UNIQUE,
        status INT REFERENCES public.enums(id) ON DELETE RESTRICT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        deleted_at TIMESTAMPTZ DEFAULT NULL
      )
    `;

    // status
    await client`
      INSERT INTO public.enums (id, enum_name, enum_value, table_context)
      VALUES
      (1401, 'Pending', 1401, 'public.customers.status'),
      (1402, 'Active', 1402, 'public.customers.status'),
      (1403, 'Inactive', 1403, 'public.customers.status')
    `;

    await client`
      CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON public.customers
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();
  `;
    await client`
      GRANT SELECT, INSERT, UPDATE ON public.customers TO admin_access;
    `;

    await client`
      GRANT SELECT, INSERT, UPDATE ON public.customers TO backend_access;
    `;
  }

  export async function down(client) {
    await client`
    DELETE FROM public.enums WHERE id IN (1401, 1402, 1403)
    `;
    await client`
      DROP TRIGGER IF EXISTS set_timestamp ON public.customers
    `;
    await client`
      DROP TABLE IF EXISTS public.customers
    `;
  }
