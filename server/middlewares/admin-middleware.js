const ApiError = require("../error/api-error");

module.exports = function (req, res, next) {
	try {
		if (req.user.role == "admin") {
			next();
		} else return next(ApiError.UnauthorizedError());
	} catch (e) {
		return next(ApiError.UnauthorizedError());
	}
};
