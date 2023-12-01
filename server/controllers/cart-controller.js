const cartService = require("../services/cart-service");
const Cart = require("../models/cart-model");
const CartItem = require("../models/cart-model");
const { validationResult } = require("express-validator");
const ApiError = require("../error/api-error");

class cartController {
	async getCart(req, res) {
		try {
			const { id } = req.params;
			const cart = await cartService.getCart(id);
			res.status(200).json(cart);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
	async addItemToCart(req, res) {
		try {
			// body: userId, productId, quantity
			const newCart = await cartService.addItemToCart(req.body);
			res.status(201).json(newCart);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
	async emptyCart(req, res) {
		try {
			const result = await cartService.emptyCart(req.body);
			res.status(200).json(result);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
	async editCartItem(req, res) {
		try {
			// body: cartId, productId, quantity
			const newCart = await cartService.editCartItem(req.body);
			res.status(201).json(newCart);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
	async removeCartItem(req, res) {
		try {
			const result = await cartService.removeCartItem(req.body);
			res.status(201).json(result);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
	async deleteCart(req, res) {
		try {
			const { id } = req.params;
			const result = await cartService.deleteCart(id);
			res.status(201).json(result);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
}

module.exports = new cartController();
