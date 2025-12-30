import Fastify from "fastify";
import prismaPlugin from "./prisma.js";
import bookRoutes from "./book/book.routes.js";

const fastify = Fastify({ logger: true });

fastify.register(prismaPlugin);
fastify.register(bookRoutes, { prefix: "/api/books" });

const start = async () => {
	try {
		fastify.listen({ port: 3000 });
	} catch (error) {
		fastify.log.error(error);
		process.exitCode = 1;
	}
};

start();
