const mongoose = require("mongoose");

const User = new mongoose.Schema({
	firstName: { type: String, required: true },
	familyName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, default: "user" },
	idCard: { type: String, required: true },
	address: {
		city: { type: String, required: true },
		street: { type: String, required: true },
	},
	orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
	cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
});

module.exports = mongoose.model("User", User);
