const Cart = require("../models/cart-model");
const User = require("../models/user-model");
const Order = require("../models/order-model");
const DeliverySlot = require("../models/delivery-slot");

class orderService {
	async getDeliverySlots() {
		const deliverySlots = await DeliverySlot.find();

		return deliverySlots;
	}
	async createOrder(params) {
		const {
			cart: cartId,
			subtotal,
			owner: userId,
			payment,
			delivery,
		} = params;
		if (!cartId || !subtotal || !userId || !payment || !delivery) {
			throw new Error("Not provided enough data");
		}

		const owner = await User.findById(userId);
		const cart = await Cart.findById(cartId);
		const order = await Order.create({
			cart: cartId,
			subtotal,
			owner: userId,
			payment,
			delivery,
		});

		owner.orders.push(order._id);
		cart.order = order._id;
		await cart.save();

		owner.cart = undefined;
		await owner.save();

		let selectedDeliverySlot = await DeliverySlot.findById(delivery.date);

		selectedDeliverySlot.owner = owner._id;
		selectedDeliverySlot.order = cart._id;
		await selectedDeliverySlot.save();

		return order;
	}
	async getLastOrderDate(params) {
		const { id } = params;
		const order = await Order.find({ owner: id }, { created: 1, _id: 0 })
			.sort({ created: -1 })
			.limit(1);
		return order[0].created;
	}
}

module.exports = new orderService();
