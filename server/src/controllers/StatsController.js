const StatsServices = require('../services/StatsServices');
const fs = require('fs').promises;
const path = require('path');
const XLSX = require('xlsx');
// import * as XLSX from 'xlsx';


class StatsController {
    static async getAllStat(req, res) {
        try {
            const stat = await StatsServices.getAllStats()
            res.json(stat)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }


  static async getAllUsers(req, res) {
    try {
      const users = await StatsServices.getAllUsers();
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
      const userGames = await StatsServices.getAllUserGames(id);
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
      const newStat = await StatsServices.addStat(score, userId);
      // console.log(newStat)
      const stat = newStat.get();
      let user = await StatsServices.getUser(stat.userId);
      user = user.get();

      // console.log(process.cwd());
      const filePath = path.join(__dirname, '..','..', 'public', 'statsAll.xlsx')
      const newData = [[user.name, stat.points]]
      let workbook
      let worksheet
      // console.log(filePath)
      try {
        workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        worksheet = workbook.Sheets[sheetName];
        XLSX.utils.sheet_add_aoa(worksheet, newData, { origin: -1 });
      } catch (error) {
        worksheet = XLSX.utils.aoa_to_sheet([['Имя пользователя', 'Счет'], ...newData]); 
        workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Статистика');
      }
      XLSX.writeFile(workbook, filePath);
      // await fs.appendFile(`./public/statsAll`, `${user.name} - ${stat.points} \n`);
      // console.log(user.get())
      return res.status(201).json(stat);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  static async downloadStats(req, res) {
    try {
      res.download('./public/statsAll.xlsx');
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

}

module.exports = StatsController;

