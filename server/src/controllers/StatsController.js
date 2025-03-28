const StatsService = require('../services/StatsServices');
// const fs = require('fs').promises;
// const path = require('path');

class StatsController {
  static async getAllUsers(req, res) {
    try {
      const users = await StatsService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async getAllUserGames(req, res) {
    const { id } = res.locals.user;
    console.log('id========', id);
    try {
      const userGames = await StatsService.getAllUserGames(id);
      res.json(userGames);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

    static async createStat(req, res) {
    const { id: userId } = res.locals.user;
    const { score} = req.body;
    try {
      const newStat = await StatsService.addStat(score, userId);
      const stat = newStat.get();
      return res.status(201).json(stat);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

}

module.exports = StatsController;
