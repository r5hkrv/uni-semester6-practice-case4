import fp from "fastify-plugin";
import type { Cart } from "../generated/prisma/client.js";

interface CartService {
	create(): Promise<Cart>;
	clear(id: number): Promise<Cart>;
}

const cartService = fp(async (fastify) => {
	fastify.decorate<CartService>("cartService", {
		create: async () => {
			return await fastify.prisma.cart.create({
				data: { total_price: 0 },
			});
		},
		clear: async (id) => {
			return await fastify.prisma.cart.update({
				where: { id },
				data: {
					total_price: 0,
					items: { deleteMany: { cart_id: id } },
				},
			});
		},
	});
});

declare module "fastify" {
	interface FastifyInstance {
		cartService: CartService;
	}
}

export default cartService;
