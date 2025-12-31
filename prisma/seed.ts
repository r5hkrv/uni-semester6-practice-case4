import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const main = async () => {
	const product = await prisma.product.findFirst();

	if (product === null) {
		await prisma.product.create({
			data: {
				preview_image_url: "abc",
				name: "Sample",
				price: 100,
				left_in_stock: 1,
			},
		});
	}
};

main();
