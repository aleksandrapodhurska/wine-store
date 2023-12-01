const Router = require("express").Router;
const productsRouter = require("./products-route");
const userRouter = require("./user-route");
const cartRouter = require("./cart-route");
const orderRouter = require("./order-route");
const authMiddleware = require("../middlewares/auth-middleware");

const router = Router();
router.use("/user", userRouter);
router.use("/products", authMiddleware, productsRouter);
router.use("/cart", authMiddleware, cartRouter);
router.use("/order", authMiddleware, orderRouter);

module.exports = router;
