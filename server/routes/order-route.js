const Router = require("express").Router;
const orderController = require("../controllers/order-controller");

const orderRouter = Router();

orderRouter.post("/", orderController.createOrder);
orderRouter.get("/deliverySlots", orderController.getDeliverySlots);
orderRouter.get("/:id", orderController.getLastOrderDate);

module.exports = orderRouter;
