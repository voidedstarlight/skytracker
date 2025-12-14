import { betterAuth } from "better-auth";
import { Pool } from "pg";

const { HOST, NAME, OPTIONS, PASS, PORT, USER } = process.env;

const instance = betterAuth({
	database: new Pool({
		connectionString: `postgres://${USER}:${PASS}@${HOST}:${PORT}/${NAME}?${OPTIONS}`
	}),
	emailAndPassword: {
		enabled: true
	}
});

export default instance;
