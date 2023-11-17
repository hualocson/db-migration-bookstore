export async function up(client) {
  await client`
  ALTER TABLE public.addresses
  ADD COLUMN name VARCHAR(20) NOT NULL DEFAULT 'Home';
  `;
}

export async function down(client) {
  await client`
  ALTER TABLE public.addresses
  DROP COLUMN name;
  `;
}
