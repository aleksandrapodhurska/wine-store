const mongoose = require("mongoose");

const Product = new mongoose.Schema({
	name: { type: String, required: true },
	category: { type: String, required: true },
	subcategory: { type: String, required: true },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	stock: { type: Number, required: false },
	unit: { type: String, required: true },
	description: { type: String, required: false },
	shortDescription: { type: String, required: false },
});

module.exports = mongoose.model("Product", Product);
