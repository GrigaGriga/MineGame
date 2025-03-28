const QuestionsService = require('../services/QuestionsServices');

class QuestionsController {
  static async getAllQuestions(req, res) {
    try {
      const questions = await QuestionsService.getAllQuestions();
      res.json(questions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async getAllThemes(req, res) {
    try {
      const themes = await QuestionsService.getAllThemes();
      res.json(themes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

}

module.exports = QuestionsController;
