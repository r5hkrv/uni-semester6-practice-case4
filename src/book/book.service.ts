import fp from "fastify-plugin";
import { type Book, Prisma } from "../generated/prisma/client.js";

interface BookService {
	getAll(): Promise<Book[]>;
	getOne(id: number): Promise<Book | null>;
	create(data: Prisma.BookCreateInput): Promise<Book>;
	update(id: number, data: Prisma.BookCreateInput): Promise<Book>;
	delete(id: number): Promise<Book>;
}

const bookService = fp(async (fastify) => {
	fastify.decorate<BookService>("bookService", {
		async getAll() {
			return fastify.prisma.book.findMany();
		},

		async getOne(id) {
			return fastify.prisma.book.findUnique({ where: { id } });
		},

		async create(data) {
			return fastify.prisma.book.create({ data });
		},

		async update(id, data) {
			return fastify.prisma.book.update({ where: { id }, data });
		},

		async delete(id) {
			return fastify.prisma.book.delete({ where: { id } });
		},
	});
});

declare module "fastify" {
	interface FastifyInstance {
		bookService: BookService;
	}
}

export default bookService;
