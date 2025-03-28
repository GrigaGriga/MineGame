const statsrouter = require('express').Router();

const StatsController = require('../controllers/StatsController');

statsrouter.route('/').get(StatsController.getAllStat);
statsrouter.route('/').post(StatsController.createStat);

module.exports = statsrouter;