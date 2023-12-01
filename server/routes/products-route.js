const Router = require("express").Router;
const productsController = require("../controllers/products-controller");

const adminMiddleware = require("../middlewares/admin-middleware");

const productsRouter = Router();

productsRouter.get("/", adminMiddleware, productsController.getAllProducts);
productsRouter.post("/", adminMiddleware, productsController.createProduct);
productsRouter.get("/categories", productsController.getCategories);
productsRouter.get("/:category", productsController.getProductsByCategory);
productsRouter.get("/singled/:id", productsController.getProduct);
productsRouter.put(
	"/edit/:id",
	adminMiddleware,
	productsController.editProduct
);
productsRouter.get("/search/:name", productsController.search);
productsRouter.delete("/:id", productsController.deleteProduct);

module.exports = productsRouter;
