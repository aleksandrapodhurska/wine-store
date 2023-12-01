const { response } = require("express");
const orderService = require("../services/order-service");

class orderController {
	async getDeliverySlots(req, res) {
		try {
			const deliverySlots = await orderService.getDeliverySlots();
			res.status(200).json(deliverySlots);
		} catch (e) {
			response.status(500).json(e.message);
		}
	}
	async createOrder(req, res) {
		try {
			const order = await orderService.createOrder(req.body);
			res.status(200).json(order);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
	async getLastOrderDate(req, res) {
		try {
			const date = await orderService.getLastOrderDate(req.params);
			res.status(200).json(date);
		} catch (e) {
			res.status(500).json(e.message);
		}
	}
}

module.exports = new orderController();
