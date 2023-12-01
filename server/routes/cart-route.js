const Router = require("express").Router;
const cartController = require("../controllers/cart-controller");

const cartRouter = Router();
//works
cartRouter.get("/:id", cartController.getCart);
cartRouter.post("/", cartController.addItemToCart);
cartRouter.put("/", cartController.removeCartItem);
cartRouter.put("/empty", cartController.emptyCart); // maybe I shall delete cart when pass it to order???
cartRouter.delete("/", cartController.deleteCart);
cartRouter.put("/edit", cartController.editCartItem);


//cartRouter.put("/carts/id", cartController.closeCart);
//cartRouter.get("/products?name=", cartController.getProductsByCategory);

module.exports = cartRouter;
