import type { FastifyPluginAsync } from "fastify";
import cartService from "./cart.service.js";
import { createCartSchema, clearCartSchema } from "./cart.schema.js";
import cartItemRoutes from "./cartItem.routes.js";

const cartRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.addHook("preHandler", (request, _, done) => {
		done(request.validationError);
	});

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
		attachValidation: true,
		handler: async (request) => {
			const { id } = request.params;

			return await fastify.cartService.clear(id);
		},
	});

	fastify.register(cartItemRoutes, {
		prefix: `/items`,
	});
};

export default cartRoutes;
