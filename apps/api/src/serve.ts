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
