import type { FastifyPluginAsync } from "fastify";
import cartService from "./cart.service.js";
import { createCartSchema, clearCartSchema } from "./cart.schema.js";
import cartItemRoutes from "./cartItem.routes.js";

const cartRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.register(cartService);

	fastify.route({
		method: "POST",
		url: "/",
		schema: createCartSchema,
		handler: async () => {
			return await fastify.cartService.create();
		},
	});

	fastify.route<{ Params: { id: number } }>({
		method: "PUT",
		url: "/clear/:id",
		schema: clearCartSchema,
		handler: async (request, reply) => {
			const { id } = request.params;

			try {
				const cart = await fastify.cartService.clear(id);

				reply.status(200).send(cart);
			} catch (error) {
				reply.status(404);
			}
		},
	});

	fastify.register(cartItemRoutes, {
		prefix: `/items`,
	});
};

export default cartRoutes;
