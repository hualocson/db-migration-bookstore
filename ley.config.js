import * as dotenv from 'dotenv';
dotenv.config();

export default {
  driver: 'postgres',
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
}