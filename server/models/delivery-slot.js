const mongoose = require("mongoose");

const Deliveryslot = new mongoose.Schema({
	date: { type: Date, required: true },
	time: {
		startTime: {
			type: Date,
			required: true,
		},
		endTime: {
			type: Date,
			required: true,
		},
	},
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
	order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order",
		default: null,
	},
});

module.exports = mongoose.model("Deliveryslot", Deliveryslot);
