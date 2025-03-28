const { User, Stat } = require('../../db/models');

class StatService {

  static getAllUsers() {
    return Stat.findAll();
  }

  static async getAllStats() {
    return await Stat.findAll();
}

  static getAllUserGames(userId) {
    return Stat.findAll({
      where: {
        userId
      },
    });
  }

    static async addStat(score, userId) {
    try {
      const newStat = await Stat.create({
        userId,
        points: score,
      });
      return newStat;
    } catch (error) {
      console.log(error);
    }
  }

  static getUser(id) {
    return User.findByPk(id);
  }

}

module.exports = StatService;
