const StatsController = require('../controllers/StatsController');
const statsRouter = require('express').Router();
const { verifyRefreshToken, verifyAccessToken } = require('../middlewares/verifyTokens');


statsRouter.route('/allusers').get(StatsController.getAllUsers)
statsRouter.route('/usergames').get(verifyRefreshToken, StatsController.getAllUserGames)
statsRouter.route('/addStat').post(verifyAccessToken, StatsController.createStat);
statsRouter.route('/download').get(StatsController.downloadStats);

module.exports = statsRouter;

