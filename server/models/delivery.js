const mongoose = require("mongoose");

const Delivery = new mongoose.Schema(
	{
		name: { type: String, required: true },
		availableSlots: [
			{
				date: { type: Date, required: true },
				timeSlots: [
					{
						startTime: {
							type: String,
							required: true,
							default: "8:00",
						},
						endTime: {
							type: String,
							required: true,
							default: "10:00",
						},
					},
				],
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Delivery", Delivery);

// const userInput = '05:20';
// const hours = userInput.slice(0, 2);
// const minutes = userInput.slice(3);

// const date = new Date(dateString);
// date.setHours(hours, minutes);
