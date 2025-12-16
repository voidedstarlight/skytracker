import { Pool } from "pg";

const env = {
	host: process.env.POSTGRES_HOST,
	name: process.env.POSTGRES_NAME,
	options: process.env.POSTGRES_OPTIONS,
	pass: process.env.POSTGRES_PASS,
	port: process.env.POSTGRES_PORT,
	user: process.env.POSTGRES_USER
};

const db_pool = new Pool({
	connectionString: `postgres://${env.user}:${env.pass}@${env.host}:${env.port}/${env.name}?${env.options}`
});

db_pool.query(`SET search_path TO ${process.env.POSTGRES_SCHEMA};`);

export default db_pool;
