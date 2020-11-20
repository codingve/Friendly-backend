const express = require('express');
const routes = express.Router();

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const SessionController = require('./controllers/SessionController')


routes.get("/", (request, response) => {
  return response.json({ greeting: "Welcomo to Fiendly API" });
});

routes.post('/sessions', SessionController.create)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;