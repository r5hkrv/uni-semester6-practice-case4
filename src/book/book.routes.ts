import { type FastifyInstance } from "fastify";
import bookService from "./book.service.js";
import { type Prisma } from "../generated/prisma/client.js";
import {
	getAllBooksSchema,
	getOneBookSchema,
	createBookSchema,
	updateBookSchema,
	deleteBookSchema,
} from "./book.schema.js";

const bookRoutes = (fastify: FastifyInstance) => {
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
		attachValidation: true,
		preHandler: (request, reply, done) => {
			if (request.validationError) {
				reply.status(400);

				done(request.validationError);
			}
			done();
		},
		handler: async (request, reply) => {
			const book = await fastify.bookService.getOne(request.params.id);

			if (book !== null) {
				reply.status(200).send(book);
			}
			reply.status(404);
		},
	});

	fastify.route<{ Body: Prisma.BookCreateInput }>({
		method: "POST",
		url: "/",
		schema: createBookSchema,
		attachValidation: true,
		preHandler: (request, reply, done) => {
			if (request.validationError) {
				reply.status(400);

				done(request.validationError);
			}
			done();
		},
		handler: async (request, reply) => {
			const book = await fastify.bookService.create(request.body);

			reply.status(201).send(book);
		},
	});

	fastify.route<{ Params: { id: number }; Body: Prisma.BookCreateInput }>({
		method: "PUT",
		url: "/:id",
		schema: updateBookSchema,
		attachValidation: true,
		preHandler: (request, reply, done) => {
			if (request.validationError) {
				reply.status(400);

				done(request.validationError);
			}
			done();
		},
		handler: async (request, reply) => {
			const { params, body } = request;

			try {
				await fastify.bookService.update(params.id, body);

				reply.status(200);
			} catch (error) {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Params: { id: number } }>({
		method: "DELETE",
		url: "/:id",
		schema: deleteBookSchema,
		attachValidation: true,
		preHandler: (request, reply, done) => {
			if (request.validationError) {
				reply.status(400);

				done(request.validationError);
			}
			done();
		},
		handler: async (request, reply) => {
			try {
				await fastify.bookService.delete(request.params.id);

				reply.status(200);
			} catch (error) {
				reply.status(404);
			}
		},
	});
};

export default bookRoutes;
