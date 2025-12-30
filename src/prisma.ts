import "dotenv/config";
import fp from "fastify-plugin";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client.js";

const prismaPlugin = fp(async (fastify) => {
	const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
	const client = new PrismaClient({ adapter });

	fastify.decorate("prisma", client);
});

declare module "fastify" {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

export default prismaPlugin;
