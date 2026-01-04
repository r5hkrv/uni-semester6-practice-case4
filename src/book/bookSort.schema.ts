import { bookSchema } from "./book.schema.js";

export const getAllBooksSchema = {
	querystring: {
		type: "object",
		properties: {
			sortBy: { enum: ["author", "year", "category"] },
			order: { enum: ["asc", "desc"] },
		},
		if: { required: ["order"] },
		then: { required: ["sortBy"] },
	},
	response: {
		200: {
			type: "array",
			items: bookSchema,
		},
	},
};

export type BookQueryString = {
	sortBy?: "author" | "year" | "category";
	order?: "asc" | "desc";
};
