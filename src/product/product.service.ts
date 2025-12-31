import fp from "fastify-plugin";
import type { Product } from "../generated/prisma/client.js";
import type {
	ProductCreateInput,
	ProductUpdateInput,
} from "../generated/prisma/models.js";

interface ProductService {
	getAll(): Promise<Product[]>;
	getOne(id: number): Promise<Product | null>;
	create(data: ProductCreateInput): Promise<Product>;
	update(id: number, data: ProductUpdateInput): Promise<Product>;
	delete(id: number): Promise<Product>;
}

const productService = fp(async (fastify) => {
	fastify.decorate<ProductService>("productService", {
		getAll: async () => {
			return await fastify.prisma.product.findMany();
		},
		getOne: async (id) => {
			return await fastify.prisma.product.findUnique({ where: { id } });
		},
		create: async (data) => {
			return await fastify.prisma.product.create({ data });
		},
		update: async (id, data) => {
			return await fastify.prisma.product.update({ where: { id }, data });
		},
		delete: async (id) => {
			return await fastify.prisma.product.delete({ where: { id } });
		},
	});
});

declare module "fastify" {
	interface FastifyInstance {
		productService: ProductService;
	}
}
export default productService;
