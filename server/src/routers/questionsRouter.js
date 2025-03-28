const questionsRouter = require('express').Router();
const QuestionsController = require('../controllers/QuestionsController');

questionsRouter.route('/questions').get(QuestionsController.getAllQuestions)
questionsRouter.route('/themes').get(QuestionsController.getAllThemes)

module.exports = questionsRouter;
