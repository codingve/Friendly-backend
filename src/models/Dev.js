const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	bio: String,
	avatar: {
		type: String,
		required: true,
	},
	hobbies: {
		type: String,
		required: true,
	},
	latitude: {
		type: Number,
		required: true,
	},
	longitude: {
		type: Number,
		required: true,
	},
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'Dev',
	}],
	dislikes: [{
		type: Schema.Types.ObjectId,
		ref: 'Dev',
	}],
}, {
	timestamps: true, //CreatedAt, UpdatedAt
});

module.exports = model('Dev', DevSchema);