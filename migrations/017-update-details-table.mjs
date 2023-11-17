export async function up(client) {
	await client `
		DROP TABLE public.product_details;
	`;
	await client `
		DROP TABLE public.customer_details;
	`;

	await client`
		CREATE TABLE IF NOT EXISTS public.product_details (
      id INT PRIMARY KEY,
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

	await client`
		CREATE TABLE IF NOT EXISTS public.customer_details (
			id INT PRIMARY KEY,
			first_name VARCHAR(20),
			last_name VARCHAR(20),
			phone_number VARCHAR(20),
			created_at TIMESTAMPTZ DEFAULT NOW(),
			updated_at TIMESTAMPTZ DEFAULT NOW(),
			deleted_at TIMESTAMPTZ DEFAULT NULL,
			FOREIGN KEY (id) REFERENCES customers(id)
	);
	`;
	await client`
		CREATE TRIGGER set_timestamp
		BEFORE UPDATE ON public.customer_details
		FOR EACH ROW
		EXECUTE PROCEDURE trigger_set_timestamp();
	`;


	await client`
		GRANT SELECT, INSERT, UPDATE ON public.customer_details TO admin_access;
	`;

	await client`
		GRANT SELECT, INSERT, UPDATE ON public.customer_details TO backend_access;
	`;
}

export async function down(client) {
	await client`
	DROP TRIGGER IF EXISTS set_timestamp ON public.product_details
`;
	await client`
		DROP TABLE IF EXISTS public.product_details
	`;

	await client`
	DROP TRIGGER IF EXISTS set_timestamp ON public.customer_details
`;
	await client`
		DROP TABLE IF EXISTS public.customer_details
	`;
}
