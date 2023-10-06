export async function up(client) {
  await client`
    INSERT INTO public.enums (id, enum_name, enum_value, table_context)
    VALUES
    (1301, 'pending', 1301, 'public.orders.status'),
    (1302, 'processed', 1302, 'public.orders.status'),
    (1303, 'delivered', 1303, 'public.orders.status'),
    (1304, 'canceled', 1304, 'public.orders.status')
  `
}

export async function down(client) {
  await client`
    DELETE FROM public.enums WHERE id IN (1301, 1302, 1303, 1304)
  `
}
