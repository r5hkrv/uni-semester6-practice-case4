const paramsSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
	},
	required: ["id"],
};

export const cartItemSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
		quantity: { type: "number" },
		payment_type: { enum: ["FIXED", "RECURRING"] },
		product_id: { type: "number" },
		cart_id: { type: "number" },
	},
};

export const getAllCartItemsSchema = {
	response: {
		200: {
			type: "array",
			items: cartItemSchema,
		},
	},
};

export const getOneCartItemSchema = {
	params: paramsSchema,
	response: {
		200: cartItemSchema,
	},
};

export const createCartItemSchema = {
	body: {
		type: "object",
		properties: {
			quantity: { type: "number" },
			payment_type: { enum: ["FIXED", "RECURRING"] },
			product_id: { type: "number" },
			cart_id: { type: "number" },
		},
		required: ["quantity", "payment_type", "product_id", "cart_id"],
	},
	response: {
		201: cartItemSchema,
	},
};

export const updateCartItemSchema = {
	params: paramsSchema,
	body: {
		type: "object",
		properties: {
			quantity: { type: "number" },
			payment_type: { enum: ["FIXED", "RECURRING"] },
			product_id: { type: "number" },
			cart_id: { type: "number" },
		},
	},
	response: {
		200: cartItemSchema,
	},
};

export const deleteCartItemSchema = {
	params: paramsSchema,
	response: {
		200: cartItemSchema,
	},
};
