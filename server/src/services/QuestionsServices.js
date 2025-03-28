const { Question, Theme } = require('../../db/models');
const path = require('path');

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
