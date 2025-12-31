const paramsSchema = {
	type: "object",
	properties: {
		id: { type: "integer" },
	},
	required: ["id"],
};

const productSchema = {
	type: "object",
	properties: {
		id: { type: "integer" },
		preview_image_url: { type: "string" },
		name: { type: "string" },
		price: { type: "number" },
		left_in_stock: { type: "integer" },
	},
};

export const getAllProductsSchema = {
	response: {
		200: {
			type: "array",
			items: productSchema,
		},
	},
};

export const getOneProductSchema = {
	params: paramsSchema,
	response: {
		200: productSchema,
	},
};

export const createProductSchema = {
	body: {
		type: "object",
		properties: {
			preview_image_url: { type: "string" },
			name: { type: "string" },
			price: { type: "number" },
			left_in_stock: { type: "integer" },
		},
		required: ["preview_image_url", "name", "price", "left_in_stock"],
	},
	response: {
		201: productSchema,
	},
};

export const updateProductSchema = {
	params: paramsSchema,
	body: {
		type: "object",
		properties: {
			preview_image_url: { type: "string" },
			name: { type: "string" },
			price: { type: "number" },
			left_in_stock: { type: "integer" },
		},
	},
	response: {
		200: productSchema,
	},
};

export const deleteProductSchema = {
	params: paramsSchema,
	response: {
		200: productSchema,
	},
};
