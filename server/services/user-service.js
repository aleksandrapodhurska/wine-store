const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const userDto = require("../dto/user-dto");
const tokenService = require("./token-service");
const ApiError = require("../error/api-error");
const { TokenExpiredError } = require("jsonwebtoken");

class userService {
	async login(username, password) {
		const user = await User.findOne({ username });
		if (!user) {
			throw ApiError.BadRequest(`User ${username} does not exist`);
		}
		const isPasswordEquals = await bcrypt.compare(password, user.password);
		if (!isPasswordEquals) {
			throw ApiError.BadRequest("Incorrect password");
		}
		const userDTO = new userDto(user);
		const tokens = await tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(userDTO.id, tokens.refreshToken);
		return {
			...tokens,
			user: userDTO,
		};
	}
	async registration(
		firstName,
		familyName,
		username,
		password,
		idCard,
		address
	) {
		const candidate = await User.findOne({ username });
		if (candidate) {
			throw ApiError.BadRequest(`${username} is already taken`);
		}
		const hashedPassword = await bcrypt.hash(password, 3);
		const newUser = await User.create({
			firstName,
			familyName,
			username,
			password: hashedPassword,
			idCard,
			address,
		});
		const userDTO = new userDto(newUser);
		const tokens = await tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(userDTO.id, tokens.refreshToken);
		return {
			...tokens,
			user: userDTO,
		};
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}
	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDB = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDB) {
			throw ApiError.UnauthorizedError();
		}
		const user = await User.findById(userData.id);
		const userDTO = new userDto(user);
		const tokens = await tokenService.generateTokens({ ...userDTO });
		await tokenService.saveToken(userDTO.id, tokens.refreshToken);
		return {
			...tokens,
			user: userDTO,
		};
	}
	async getUserInfo(params) {
		const { id } = params;
		const userInfo = await User.find({ _id: id }, { __v: 0, password: 0 });
		return userInfo;
	}
}

module.exports = new userService();
