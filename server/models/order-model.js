const mongoose = require("mongoose");

const Order = new mongoose.Schema({
	created: { type: Date, required: true, default: new Date() },
	cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
	subtotal: { type: Number, default: 0 },
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	payment: { type: String, required: true, min: [16], max: [16] },
	delivery: {
		address: {
			city: { type: String, required: true },
			street: { type: String, required: true },
		},
		date: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Deliveryslot",
			default: null,
		}
	},
});

module.exports = mongoose.model("Order", Order);
