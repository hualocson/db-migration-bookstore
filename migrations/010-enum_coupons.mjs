export async function up(client) {
  await client`
    INSERT INTO public.enums (id, enum_name, enum_value, table_context)
    VALUES
    (1201, 'percent', 1201, 'public.coupons.coupon_type'),
    (1202, 'fixed amount', 1202, 'public.coupons.coupon_type'),
    (1203, 'active', 1203, 'public.coupons.coupon_status'),
    (1204, 'expired', 1204, 'public.coupons.coupon_status'),
    (1205, 'disabled', 1205, 'public.coupons.coupon_status')
  `
}

export async function down(client) {
  await client`
    DELETE FROM public.enums WHERE id IN (1201, 1202, 1203, 1204, 1205)
  `
}
