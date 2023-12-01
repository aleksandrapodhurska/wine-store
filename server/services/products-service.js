const Product = require("../models/product-model");

class productsService {
	async getAllProducts() {
		const products = await Product.find({}, { __v: 0 });
		return products;
	}
	async createProduct(product) {
		if (!product) {
			throw new Error("Not provided enough data");
		}
		const {
			name,
			category,
			subcategory,
			image,
			price,
			stock,
			unit,
			description,
		} = product;
		const newProduct = await Product.create({
			name,
			category,
			subcategory,
			image,
			price,
			stock,
			unit,
			description,
		});
		return newProduct;
	}
	async getCategories() {
		const products = await Product.find({}, { category: 1, _id: 0 });
		const categories = [...new Set(products.map((item) => item.category))];
		return categories;
	}
	async getProductsByCategory(params) {
		let category = params.category;
		if (!category) {
			throw new Error("Not provided enough data");
		}
		const products = await Product.find({ category: category });
		return products;
	}
	async getProduct(params) {
		const { id } = params;
		if (!id) {
			throw new Error("Not provided enough data");
		}
		const product = await Product.findById(id);
		return product;
	}
	async editProduct(params, product) {
		if (!params || !product) {
			throw new Error("Not provided enough data");
		}
		const prevProduct = await Product.findById(params.id);
		const newProduct = { ...prevProduct, product };
		await Product.findByIdAndUpdate(params.id, newProduct.product);
		const updatedProduct = await Product.findById(params.id);
		return updatedProduct;
	}
	async search(params) {
		const { name } = params;
		if (!name) {
			throw new Error("Not provided enough data");
		}
		const product = await Product.find({
			name: { $regex: name, $options: "i" },
		});
		return product;
	}
	async deleteProduct(params) {
		const { id } = params;
		if (!id) {
			throw new Error("Not provided enough data");
		}
		const product = await Product.findByIdAndDelete(id);
		return product;
	}
}

module.exports = new productsService();
