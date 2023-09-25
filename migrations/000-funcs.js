export const up = async client => {
  await client`
      CREATE OR REPLACE FUNCTION trigger_set_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
  `;
};

export const down = async client => {
  await client`
      DROP FUNCTION trigger_set_timestamp;
  `;
};
