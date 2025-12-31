import type { FastifyPluginAsync } from "fastify";
import type {
	BookCreateInput,
	BookUpdateInput,
} from "../generated/prisma/models.js";
import bookService from "./book.service.js";
import {
	getAllBooksSchema,
	getOneBookSchema,
	createBookSchema,
	updateBookSchema,
	deleteBookSchema,
} from "./book.schema.js";

const bookRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(bookService);

	fastify.route({
		method: "GET",
		url: "/",
		schema: getAllBooksSchema,
		handler: async () => {
			return await fastify.bookService.getAll();
		},
	});

	fastify.route<{ Params: { id: number } }>({
		method: "GET",
		url: "/:id",
		schema: getOneBookSchema,
		handler: async (request, reply) => {
			const { id } = request.params;
			const book = await fastify.bookService.getOne(id);

			if (book !== null) {
				reply.status(200).send(book);
			} else {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Body: BookCreateInput }>({
		method: "POST",
		url: "/",
		schema: createBookSchema,
		handler: async (request, reply) => {
			const { body } = request;
			const book = await fastify.bookService.create(body);

			reply.status(201).send(book);
		},
	});

	fastify.route<{ Params: { id: number }; Body: BookUpdateInput }>({
		method: "PUT",
		url: "/:id",
		schema: updateBookSchema,
		handler: async (request, reply) => {
			const { id } = request.params;
			const { body } = request;

			try {
				const book = await fastify.bookService.update(id, body);

				reply.status(200).send(book);
			} catch (error) {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Params: { id: number } }>({
		method: "DELETE",
		url: "/:id",
		schema: deleteBookSchema,
		handler: async (request, reply) => {
			const { id } = request.params;

			try {
				const book = await fastify.bookService.delete(id);

				reply.status(200).send(book);
			} catch (error) {
				reply.status(404);
			}
		},
	});
};

export default bookRoutes;
