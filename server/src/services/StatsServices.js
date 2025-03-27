const { Stat } = require('../../db/models');
const path = require('path');

class StatService {

  static getAllUsers() {
    return Stat.findAll();
  }

  static getAllUserGames(userId) {
    return Stat.findAll({
      where: {
        userId
      },
    });
  }
}

module.exports = StatService;
