'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Theme}) {
      this.belongsTo(Theme, { foreignKey: 'themeId' });
    }
  }
  Question.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    point: DataTypes.INTEGER,
    isSolved: DataTypes.BOOLEAN,
    themeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};