const Dev = require('../models/Dev')

module.exports = {
  async create(req, res) {
    const { username } = req.body;
		const userExists = await Dev.findOne({ user: username });

		if (!userExists) {
      return res.status(400).json({ error: 'No ONG found with this ID' })
		}

    return res.json(userExists);
  }
}