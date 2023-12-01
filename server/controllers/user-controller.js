const userService = require("../services/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../error/api-error");

class userController {
	async login(req, res, next) {
		try {
			const { username, password } = req.body;
			const userData = await userService.login(username, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest("Validation error", errors.array())
				);
			}
			const {
				firstName,
				familyName,
				username,
				password,
				idCard,
				address,
			} = req.body;
			const userData = await userService.registration(
				firstName,
				familyName,
				username,
				password,
				idCard,
				address
			);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}
	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);

			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async getUserInfo(req, res, next) {
		try {
			const userInto = await userService.getUserInfo(req.params);
			return res.json(userInto);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new userController();
