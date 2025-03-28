const StatService = require('../services/StatsService');

class StatsController {
    static async getAllStat(req, res) {
        try {
            const stat = await StatService.getAllStats()
            res.json(stat)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    static async createStat(req, res) {
        const { point } = req.body;
        const userId = res.locals.user.id
        try {
            const stat = await StatService.createStat(point, userId)
            res.json(stat)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = StatsController