const Cart = require("../models/cart-model");
const CartItem = require("../models/cart-model");
const User = require("../models/user-model");
const Product = require("../models/product-model");

class cartService {
	async getCart(id) {
		const cart = await Cart.find({ owner: id })
			.sort({ createdAt: -1 })
			.limit(1)
			.populate("items.productId", {
				_id: 1,
				name: 1,
				image: 1,
				category: 1,
			});
		if (!cart[0].order) {
			return cart[0];
		} else return null;
	}
	async addItemToCart(params) {
		const { userId, productId, quantity } = params;
		if (!userId || !productId || !quantity) {
			throw new Error("Not provided enough data");
		}

		// get user's Cart
		const owner = await User.findById(userId);

		// get selected product
		const productDetails = await Product.findById(productId);

		//check if cart already exsists and quantity of the selected item
		if (owner.cart) {
			let cart = await Cart.findById(owner.cart);
			let indexFound = cart.items.findIndex(
				(item) => item.productId == productId
			);

			//if product exsists in the cart, then indexFound will not be -1 + update its quantity
			if (indexFound != -1) {
				cart.items[indexFound].quantity =
					cart.items[indexFound].quantity + quantity;
				cart.items[indexFound].total =
					cart.items[indexFound].quantity * productDetails.price;
				cart.items[indexFound].price = productDetails.price;
				cart.subtotal = cart.items
					.map((item) => item.total)
					.reduce((acc, next) => acc + next);
			} else {
				cart.items.push({
					productId,
					quantity,
					price: productDetails.price,
					total: productDetails.price * quantity,
				});
				cart.subtotal = cart.items
					.map((item) => item.total)
					.reduce((acc, next) => acc + next);
			}
			cart = await cart.save();
			return cart.populate("items.productId", {
				_id: 1,
				name: 1,
				image: 1,
				category: 1,
			});
		} else {
			const newCart = await Cart.create({
				owner: userId,
				items: [
					{
						productId,
						quantity,
						price: productDetails.price,
						total: productDetails.price * quantity,
					},
				],
				subtotal: productDetails.price * quantity,
			});
			owner.cart = newCart._id;
			await owner.save();
			return newCart;
		}
	}
	async emptyCart(params) {
		const { cartId } = params;
		if (!cartId) {
			throw new Error("Not provided cartId");
		}
		let cart = await Cart.findById(cartId);
		cart.items = [];
		cart.subtotal = 0;
		cart = await cart.save();
		return cart;
	}
	async editCartItem(params) {
		const { cartId, productId, quantity } = params.body;
		if (!cartId || !productId || !quantity) {
			if (quantity == 0) {
				throw new Error("Quantity must be more than 0");
			}
			throw new Error("Not provided enough data");
		}
		let cart = await Cart.findById(cartId);
		const productDetails = await Product.findById(productId);
		if (cart) {
			let indexFound = cart.items.findIndex(
				(item) => item.productId == productId
			);
			if (indexFound != -1) {
				cart.items[indexFound].quantity = quantity;
				cart.items[indexFound].total = quantity * productDetails.price;
				cart.subtotal = cart.items
					.map((item) => item.total)
					.reduce((acc, next) => acc + next);
				await cart.save();
				return cart.populate("items.productId", {
					_id: 1,
					name: 1,
					image: 1,
					category: 1,
				});
			} else throw new Error("Did not find product in the cart");
		} else throw new Error("Did not find the cart");
	}
	async removeCartItem(params) {
		const { cartId, productId } = params;
		if (!cartId || !productId) {
			throw new Error("Not provided enough data");
		}
		let cart = await Cart.findById(cartId);

		let indexFound = cart.items.findIndex(
			(item) => item.productId == productId
		);
		if (indexFound != -1) {
			let itemToDelete = cart.items[indexFound];
			cart.items = cart.items.filter(
				(item) => item.productId != productId
			);
			cart.subtotal = cart.subtotal - itemToDelete.total;
			cart = await cart.save();
			return cart.populate("items.productId", {
				_id: 1,
				name: 1,
				image: 1,
				category: 1,
			});
		} else throw new Error("Did not find item in the cart");
	}
	async deleteCart(params) {
		const { cartId, userId } = params;
		if (!cartId || !userId) {
			throw new Error("Not provided enough data");
		}
		const result = await Cart.findByIdAndDelete(cartId);
		let owner = await User.findById(userId);
		owner.cart = undefined;
		await owner.save();
		return result;
	}
}

module.exports = new cartService();
