import { betterAuth } from "better-auth";
import { Pool } from "pg";

const env = {
	host: process.env.POSTGRES_HOST,
	name: process.env.POSTGRES_NAME,
	options: process.env.POSTGRES_OPTIONS,
	pass: process.env.POSTGRES_PASS,
	port: process.env.POSTGRES_PORT,
	user: process.env.POSTGRES_USER
};

const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	database: new Pool({
		connectionString: `postgres://${env.user}:${env.pass}@${env.host}:${env.port}/${env.name}?${env.options}`
	}),
	emailAndPassword: {
		autoSignIn: false,
		enabled: true,
		minPasswordLength: 1,
		requireEmailVerification: false
	},
	secret: process.env.BETTER_AUTH_SECRET
});

export default auth;
