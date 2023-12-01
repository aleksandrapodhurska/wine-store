const Token = require("../models/token-model");
const jwt = require("jsonwebtoken");

class tokenService {
	async generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
			expiresIn: "10m",
		});
		const refreshToken = jwt.sign(
			payload,
			process.env.SECRET_REFRESH_TOKEN,
			{ expiresIn: "30d" }
		);
		return {
			accessToken,
			refreshToken,
		};
	}
	async saveToken(userId, refreshToken) {
		const tokenData = await Token.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await Token.create({ user: userId, refreshToken });
		return token;
	}
	validateAccessToken(token) {
		try {
			const tokenData = jwt.verify(
				token,
				process.env.SECRET_ACCESS_TOKEN
			);
			return tokenData;
		} catch (e) {
			return null;
		}
	}
	validateRefreshToken(token) {
		try {
			const tokenData = jwt.verify(
				token,
				process.env.SECRET_REFRESH_TOKEN
			);
			return tokenData;
		} catch (e) {
			return null;
		}
	}
	async findToken(refreshToken) {
		const tokenData = await Token.findOne({ refreshToken });
		return tokenData;
	}
	async removeToken(refreshToken) {
		const tokenData = await Token.deleteOne({ refreshToken });
		return tokenData;
	}
}

module.exports = new tokenService();
