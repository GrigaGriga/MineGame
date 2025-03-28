const { Stat } = require('../../db/models');

class StatService {
    static async getAllStats() {
        return await Stat.findAll();
    }

    static async getById(id) {
        return await Stat.findByPk(id);
    }

    static async create(data){
        return await Stat.create(data);
    }
}

module.exports = StatService