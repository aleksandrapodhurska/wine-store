const mongoose = require("mongoose");

const CartItem = new mongoose.Schema(
	{
		productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
		quantity: {
			type: Number,
			required: true,
			min: [1, "Quantity can not be less than one"],
		},
		price: { type: Number, required: true },
		discount: { type: Number, required: false, default: 0 },
		total: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("CartItem", CartItem);

const Cart = new mongoose.Schema(
	{
		items: [CartItem],
		subtotal: { type: Number, default: 0 },
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		order: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			default: null,
		},
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("Cart", Cart);
