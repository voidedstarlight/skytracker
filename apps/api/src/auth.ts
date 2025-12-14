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
	basePath: "/A/auth",
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

async function routeHandler(server, request, reply) {
	try {
    const url = new URL(request.url, `http://${request.headers.host}`);
      
    const standard_request = new Request(url.toString(), {
      method: request.method,
			headers: new Headers(request.headers),
      body: request.body ? JSON.stringify(request.body) : undefined,
		});

    const auth_data = await auth.handler(standard_request);

    reply.status(auth_data.status);
    auth_data.headers.forEach((value, key) => reply.header(key, value));
    reply.send(auth_data.body ? await auth_data.text() : null);

	} catch (err) {
    server.log.warn("[/A/auth] error in authentication procedure");
		server.log.warn(err);
    reply.status(400).send();
  }
}

// [todo] cors

export default routeHandler;
