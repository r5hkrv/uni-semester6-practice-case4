import fp from "fastify-plugin";
import { type CartItem } from "../generated/prisma/client.js";
import {
	type CartItemCreateInput,
	type CartItemUpdateInput,
} from "../generated/prisma/models.js";

interface CartItemService {
	getAll(): Promise<CartItem[]>;
	getOne(id: number): Promise<CartItem | null>;
	create(data: CartItemCreateInput): Promise<CartItem>;
	update(id: number, data: CartItemUpdateInput): Promise<CartItem>;
	delete(id: number): Promise<CartItem>;
}

const cartItemService = fp(async (fastify) => {
	fastify.decorate<CartItemService>("cartItemService", {
		getAll: async () => {
			return fastify.prisma.cartItem.findMany();
		},
		getOne: async (id) => {
			return await fastify.prisma.cartItem.findUnique({
				where: { id },
			});
		},
		create: async (data) => {
			return await fastify.prisma.cartItem.create({ data });
		},
		update: async (id, data) => {
			return await fastify.prisma.cartItem.update({
				where: { id },
				data,
			});
		},
		delete: async (id) => {
			return await fastify.prisma.cartItem.delete({
				where: { id },
			});
		},
	});
});

declare module "fastify" {
	interface FastifyInstance {
		cartItemService: CartItemService;
	}
}

export default cartItemService;
