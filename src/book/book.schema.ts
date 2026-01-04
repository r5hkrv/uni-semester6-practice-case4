const paramsSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
	},
	required: ["id"],
};

export const bookSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
		cover_image_url: { type: "string" },
		title: { type: "string" },
		author: { type: "string" },
		year: { type: "number" },
		category: { type: "string" },
	},
};

export const getOneBookSchema = {
	params: paramsSchema,
	response: {
		200: bookSchema,
	},
};

export const createBookSchema = {
	body: {
		type: "object",
		properties: {
			cover_image_url: { type: "string" },
			title: { type: "string" },
			author: { type: "string" },
			year: { type: "number" },
			category: { type: "string" },
		},
		required: ["cover_image_url", "title", "author", "year", "category"],
	},
	response: {
		201: bookSchema,
	},
};

export const updateBookSchema = {
	params: paramsSchema,
	body: {
		type: "object",
		properties: {
			cover_image_url: { type: "string" },
			title: { type: "string" },
			author: { type: "string" },
			year: { type: "number" },
			category: { type: "string" },
		},
	},
	response: {
		200: bookSchema,
	},
};

export const deleteBookSchema = {
	params: paramsSchema,
	response: {
		200: bookSchema,
	},
};
