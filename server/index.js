require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const router = require("./routes/index");

const errorMiddleware = require("./middlewares/error-middleware");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:4200',
		credentials: true,
	})
);

app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () =>
			console.log(`server is running on ${PORT} PORT`)
		);
	} catch (e) {
		console.log(e);
	}
};
start();
