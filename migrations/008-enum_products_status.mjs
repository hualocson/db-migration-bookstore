export async function up(client) {
  await client`
    INSERT INTO public.enums (id, enum_name, enum_value, table_context)
    VALUES
    (1101, 'In Stock', 1101, 'public.products.status'),
    (1102, 'Out of Stock', 1102, 'public.products.status'),
    (1103, 'On Sale', 1103, 'public.products.status'),
    (1104, 'New Arrival', 1104, 'public.products.status'),
    (1105, 'Bestseller', 1105, 'public.products.status')
  `
}

export async function down(client) {
  await client`
    DELETE FROM public.enums WHERE id IN (1101, 1102, 1103, 1104, 1105)
  `
}
