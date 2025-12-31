import type { FastifyPluginAsync } from "fastify";
import type {
	CartItemCreateInput,
	CartItemUpdateInput,
} from "../generated/prisma/models.js";
import cartItemService from "./cartItem.service.js";
import {
	getAllCartItemsSchema,
	getOneCartItemSchema,
	createCartItemSchema,
	updateCartItemSchema,
	deleteCartItemSchema,
} from "./cartItem.schema.js";

const cartItemRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(cartItemService);

	fastify.route({
		method: "GET",
		url: "/",
		schema: getAllCartItemsSchema,
		handler: async () => {
			return await fastify.cartItemService.getAll();
		},
	});

	fastify.route<{ Params: { id: number } }>({
		method: "GET",
		url: "/:id",
		schema: getOneCartItemSchema,
		handler: async (request, reply) => {
			const { id } = request.params;
			const item = await fastify.cartItemService.getOne(id);

			if (item !== null) {
				reply.status(200).send(item);
			} else {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Body: CartItemCreateInput }>({
		method: "POST",
		url: "/",
		schema: createCartItemSchema,
		handler: async (request, reply) => {
			const { body } = request;
			const item = await fastify.cartItemService.create(body);

			reply.status(201).send(item);
		},
	});

	fastify.route<{ Params: { id: number }; Body: CartItemUpdateInput }>({
		method: "PUT",
		url: "/:id",
		schema: updateCartItemSchema,
		handler: async (request, reply) => {
			const { id } = request.params;
			const { body } = request;

			try {
				const item = await fastify.cartItemService.update(id, body);

				reply.status(200).send(item);
			} catch (error) {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Params: { id: number } }>({
		method: "DELETE",
		url: "/:id",
		schema: deleteCartItemSchema,
		handler: async (request, reply) => {
			const { id } = request.params;

			try {
				const item = await fastify.cartItemService.delete(id);

				reply.status(200).send(item);
			} catch (error) {
				reply.status(404);
			}
		},
	});
};

export default cartItemRoutes;
