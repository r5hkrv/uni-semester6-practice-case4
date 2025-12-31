const cartSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
		total_price: { const: 0 },
	},
};

export const createCartSchema = {
	response: {
		200: cartSchema,
	},
};

export const clearCartSchema = {
	params: {
		type: "object",
		properties: {
			id: { type: "number" },
		},
		required: ["id"],
	},
	response: {
		200: cartSchema,
	},
};
