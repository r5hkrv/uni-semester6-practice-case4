import Fastify from "fastify";
import prismaPlugin from "./prisma.js";

const fastify = Fastify({ logger: true });

fastify.register(prismaPlugin);

const start = async () => {
	try {
		fastify.listen({ port: 3000 });
	} catch (error) {
		fastify.log.error(error);
		process.exitCode = 1;
	}
};

start();
