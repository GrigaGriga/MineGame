const questionsRouter = require('express').Router();
const checkId = require('../middlewares/checkId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const QuestionsController = require('../controllers/QuestionsController');
// const upload = require('../middlewares/multer');

questionsRouter.route('/questions').get(QuestionsController.getAllQuestions)
questionsRouter.route('/themes').get(QuestionsController.getAllThemes)

module.exports = questionsRouter;
