import fp from "fastify-plugin";
import type { BookOrderByWithRelationInput } from "../generated/prisma/models.js";
import type { Book } from "../generated/prisma/client.js";

type AuthorSortOrder = BookOrderByWithRelationInput["author"];
type YearSortOrder = BookOrderByWithRelationInput["year"];
type CategorySortOrder = BookOrderByWithRelationInput["category"];

interface BookSortService {
	sortByAuthor(order?: AuthorSortOrder): Promise<Book[]>;
	sortByYear(order?: YearSortOrder): Promise<Book[]>;
	sortByCategory(order?: CategorySortOrder): Promise<Book[]>;
}

const bookSortService = fp(async (fastify) => {
	fastify.decorate<BookSortService>("bookSortService", {
		sortByAuthor: async (order = "asc") => {
			return await fastify.prisma.book.findMany({
				orderBy: {
					author: order,
				},
			});
		},
		sortByYear: async (order = "asc") => {
			return await fastify.prisma.book.findMany({
				orderBy: {
					year: order,
				},
			});
		},
		sortByCategory: async (order = "asc") => {
			return await fastify.prisma.book.findMany({
				orderBy: {
					category: order,
				},
			});
		},
	});
});

declare module "fastify" {
	interface FastifyInstance {
		bookSortService: BookSortService;
	}
}

export default bookSortService;
