// const statsrouter = require('express').Router();
const StatsController = require('../controllers/StatsController');
// statsrouter.route('/').get(StatsController.getAllStat);
// module.exports = statsrouter;
const statsRouter = require('express').Router();
// const checkId = require('../middlewares/checkId');
const { verifyRefreshToken, verifyAccessToken } = require('../middlewares/verifyTokens');
// const StatsController = require('../controllers/StatsController');


statsRouter.route('/allusers').get(StatsController.getAllUsers)
statsRouter.route('/usergames').get(verifyRefreshToken, StatsController.getAllUserGames)
statsRouter.route('/addStat').post(verifyAccessToken, StatsController.createStat);
statsRouter.route('/download').get(StatsController.downloadStats);

module.exports = statsRouter;

