import fp from "fastify-plugin";
import type { Book } from "../generated/prisma/client.js";
import type {
	BookCreateInput,
	BookUpdateInput,
} from "../generated/prisma/models.js";

interface BookService {
	getAll(): Promise<Book[]>;
	getOne(id: number): Promise<Book | null>;
	create(data: BookCreateInput): Promise<Book>;
	update(id: number, data: BookUpdateInput): Promise<Book>;
	delete(id: number): Promise<Book>;
}

const bookService = fp(async (fastify) => {
	fastify.decorate<BookService>("bookService", {
		getAll: async () => {
			return fastify.prisma.book.findMany();
		},
		getOne: async (id) => {
			return fastify.prisma.book.findUnique({ where: { id } });
		},
		create: async (data) => {
			return fastify.prisma.book.create({ data });
		},
		update: async (id, data) => {
			return fastify.prisma.book.update({ where: { id }, data });
		},
		delete: async (id) => {
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
