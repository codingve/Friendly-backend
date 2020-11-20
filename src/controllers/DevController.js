const axios = require('axios');
const mongoose = require('mongoose');
const Dev = require('../models/Dev')


module.exports = {
	async index(req, res) {
		const { user } = req.headers;
		const loggedDev = await Dev.findById(user);

		const users = await Dev.find({
			$and: [
				{ _id: { $ne: user } },
				{ _id: { $nin: loggedDev.likes } },
				{ _id: { $nin: loggedDev.dislikes } },
			],
		})

		return res.json(users);
	},

	async store(req, res) {
		const { username, hobbies, latitude, longitude } = req.body;
		const userExists = await Dev.findOne({ user: username });

		if (userExists) {
			return res.status(422).json({ error: 'Github user exists' });
		}

		try{
			const response = await axios.get(`https://api.github.com/users/${username}`);
	
			const { name, bio, avatar_url: avatar } = response.data;
			
			const dev = await Dev.create({
				name,
				user: username,
				bio,
				avatar,
				hobbies, 
				latitude, 
				longitude
			});
			
			return res.json(dev);
			
		} catch (err) {
			return res.status(400).json({ error: 'Erro ao tentar salvar o novo usuario.' });
		}
		
	}
}

