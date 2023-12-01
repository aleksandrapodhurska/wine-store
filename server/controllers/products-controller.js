const productsService = require("../services/products-service");
const { validationResult } = require("express-validator");
const ApiError = require("../error/api-error");

class productsController {
	async getAllProducts(req, res) {
		try {
			const products = await productsService.getAllProducts();
			res.status(200).json(products);
		} catch (e) {
			res.status(500).json(e);
		}
	}
	async getCategories(req, res) {
		try {
			const categories = await productsService.getCategories();
			res.status(200).json(categories);
		} catch (e) {
			res.status(500).json(e);
		}
	}
	async getProductsByCategory(req, res) {
		try {
			const products = await productsService.getProductsByCategory(
				req.params
			);
			res.status(200).json(products);
		} catch (e) {
			res.status(500).json(e);
		}
	}
	async getProduct(req, res) {
		try {
			const product = await productsService.getProduct(req.params);
			res.status(200).json(product);
		} catch (e) {
			res.status(500).json(e);
		}
	}
	async createProduct(req, res) {
		try {
			const newProduct = await productsService.createProduct(req.body);
			res.status(200).send(newProduct);
		} catch (e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
	async editProduct(req, res) {
		try {
			const newProduct = await productsService.editProduct(
				req.params,
				req.body
			);
			res.status(200).send(newProduct);
		} catch (e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
	async deleteProduct(req, res) {
		try {
			const response = await productsService.deleteProduct(req.params);
			res.status(200).send(response);
		} catch (e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
	async search(req, res) {
		try {
			const products = await productsService.search(req.params);
			res.status(200).send(products);
		} catch (e) {
			console.log(e);
			res.status(500).json(e.message);
		}
	}
}

module.exports = new productsController();
