import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { join } from "path";

const server = Fastify.fastify({
	logger: {
		level: process.env.NODE_ENV === "production" ? "warn" : "info",
		transport: {
			target: "pino-pretty"
		}
	}
});

server.register(fastifyStatic, {
	prefix: "/",
	root: join(__dirname, "public")
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
