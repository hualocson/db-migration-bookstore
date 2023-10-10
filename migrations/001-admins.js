export const up = async client => {
  await client `
  CREATE TABLE IF NOT EXISTS admin.admins (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(200) PRIMARY KEY,
    user_password VARCHAR(200) NOT NULL,
    admin_rank smallint NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `;

    await client `
    CREATE TRIGGER set_timestamp BEFORE
    UPDATE
      ON admin.admins FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
    `;
};

export const down = async client => {
  await client`
    DROP TRIGGER IF EXISTS set_timestamp ON admin.admins
  `;

  await client `
    DROP TABLE IF EXISTS admin.admins
  `;
};
