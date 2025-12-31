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
	fastify.addHook("preHandler", (request, _, done) => {
		done(request.validationError);
	});

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
		attachValidation: true,
		handler: async (request, reply) => {
			const { id } = request.params;
			const item = await fastify.cartItemService.getOne(id);

			if (item !== null) {
				reply.send(item);
			} else {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Body: CartItemCreateInput }>({
		method: "POST",
		url: "/",
		schema: createCartItemSchema,
		attachValidation: true,
		handler: async (request, reply) => {
			const { body } = request;

			try {
				const item = await fastify.cartItemService.create(body);

				reply.status(201).send(item);
			} catch (error) {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Params: { id: number }; Body: CartItemUpdateInput }>({
		method: "PUT",
		url: "/:id",
		schema: updateCartItemSchema,
		attachValidation: true,
		handler: async (request, reply) => {
			const { id } = request.params;
			const { body } = request;

			try {
				const item = await fastify.cartItemService.update(id, body);

				reply.send(item);
			} catch (error) {
				reply.status(404);
			}
		},
	});

	fastify.route<{ Params: { id: number } }>({
		method: "DELETE",
		url: "/:id",
		schema: deleteCartItemSchema,
		attachValidation: true,
		handler: async (request, reply) => {
			const { id } = request.params;

			try {
				await fastify.cartItemService.delete(id);
			} catch (error) {
				reply.status(404);
			}
		},
	});
};

export default cartItemRoutes;
