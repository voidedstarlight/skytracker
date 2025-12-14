import auth from "./auth";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { join } from "path";
import { readFileSync } from "fs";

const server = Fastify.fastify({
	logger: {
		level: process.env.NODE_ENV === "production" ? "warn" : "info",
		transport: {
			target: "pino-pretty"
		}
	}
});

server.register(fastifyStatic, {
	prefix: "/a",
	root: join(__dirname, "public")
});

server.post("/A/register", {
	schema: {
		body: {
			additionalProperties: false,
			type: "object",
			properties: {
				email: { type: "string" },
				name: { type: "string" },
				password: { type: "string" }
			},
			required: ["email", "name", "password"]
		}
	}
}, async (request, reply) => {
	try {
		// [todo] remove auth_data variable
		const auth_data = await auth.api.signUpEmail({
			body: {
				email: request.body.email,
				name: request.body.name,
				password: request.body.password
			}
		});
	
		console.log(auth_data);
		reply.send();
	} catch (err) {
		server.log.warn("[/A/register] auth error");
		server.log.warn(err);
		reply.status(400).send();
	}
});

server.post("/A/authenticate", {
	schema: {
		body: {
			additionalProperties: false,
			type: "object",
			properties: {
				email: { type: "string" },
				password: { type: "string" }
			},
			required: ["email", "password"]
		}
	}
}, async (request, reply) => {
	const auth_data = await auth.api.signInEmail({
		body: {
			email: request.body.email,
			password: request.body.password
		}
	});

	console.log(auth_data);

	reply.send()
});

server.get("*", (_, reply) => {
	void reply.type("text/html");
	return readFileSync(join(__dirname, "public/index.html"));
});

server.listen({
	host: "0.0.0.0",
	port: 8858
}, err => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	} else {
		server.log.info("[server] http://0.0.0.0:8858");
	}
});
