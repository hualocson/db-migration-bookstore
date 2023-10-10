export async function up(client) {
  await client`
    INSERT INTO public.enums (id, enum_name, enum_value, table_context)
    VALUES
    (1001, 'active', 1001, 'public.categories.status'),
    (1002, 'inactive', 1002, 'public.categories.status')
  `
}

export async function down(client) {
  await client`
    DELETE FROM public.enums WHERE id IN (1001, 1002)
  `
}
