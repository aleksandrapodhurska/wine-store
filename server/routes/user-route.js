const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post(
	"/registration",
	body("firstName").notEmpty(),
	body("familyName").notEmpty(),
	body("username").notEmpty(),
	body("password").isLength({ min: 3, max: 32 }),
	userController.registration
);
userRouter.post("/logout", userController.logout);
userRouter.get("/refreshToken", userController.refresh);
userRouter.get("/:id", userController.getUserInfo);

module.exports = userRouter;
