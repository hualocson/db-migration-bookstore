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

  await client `
    INSERT INTO
      admin.admins (username, user_password, admin_rank)
    VALUES
      (
        'your-superadmin-name',
        'hashed-password-from-endpoint',
        3
      )
  `;
};

export const down = async client => {
  await client `
    DROP TABLE IF EXISTS admin.admins
  `
};
