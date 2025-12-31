import type { FastifyPluginAsync } from "fastify";
import productService from "./product.service.js";
import {
	getAllProductsSchema,
	getOneProductSchema,
	createProductSchema,
	updateProductSchema,
	deleteProductSchema,
} from "./product.schema.js";
import type {
	ProductCreateInput,
	ProductUpdateInput,
} from "../generated/prisma/models.js";

const productRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(productService);

	fastify.route({
		method: "GET",
		url: "/",
		schema: getAllProductsSchema,
		handler: async () => {
			return await fastify.productService.getAll();
		},
	});

	fastify.route<{ Params: { id: number } }>({
		method: "GET",
		url: "/:id",
		schema: getOneProductSchema,
		handler: async (request, reply) => {
			const { id } = request.params;
			const product = await fastify.productService.getOne(id);

			if (product !== null) {
				reply.status(200).send(product);
			} else {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Body: ProductCreateInput }>({
		method: "POST",
		url: "/",
		schema: createProductSchema,
		handler: async (request, reply) => {
			const { body } = request;
			const product = await fastify.productService.create(body);

			reply.status(201).send(product);
		},
	});

	fastify.route<{ Params: { id: number }; Body: ProductUpdateInput }>({
		method: "PUT",
		url: "/:id",
		schema: updateProductSchema,
		handler: async (request, reply) => {
			const { id } = request.params;
			const { body } = request;

			try {
				const product = await fastify.productService.update(id, body);

				reply.status(200).send(product);
			} catch (error) {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Params: { id: number } }>({
		method: "DELETE",
		url: "/:id",
		schema: deleteProductSchema,
		handler: async (request, reply) => {
			const { id } = request.params;

			try {
				const product = await fastify.productService.delete(id);

				reply.status(200).send(product);
			} catch (error) {
				reply.status(404);
			}
		},
	});
};

export default productRoutes;
