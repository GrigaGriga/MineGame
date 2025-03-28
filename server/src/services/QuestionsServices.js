const { Question, Theme } = require('../../db/models');

class QuestionsService {

  static getAllQuestions() {
    return Question.findAll({
      include: [{
        model: Theme,
      },]
    });
  }

  static getAllThemes() {
    return Theme.findAll({
      include: [{
        model: Question,
      },]
    });
  }

}

module.exports = QuestionsService;
