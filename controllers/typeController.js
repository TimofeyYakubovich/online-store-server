const {Type} = require('../models/models') // импортируем модель Type
const ApiError = require('../error/ApiError')
// каждый случай обрабатывать не будем, прямо полнаценную валидацию делать тоже не будем, сделаем так что бы работало

class TypeController {
    async create(req, res) {
        const {name} = req.body // из тела запроса достаем название типа
        // функцие create создаем тип в бд параметром передаем объект где указываем нужные поля
        // в этом случае только 1 поле name, id будет присвоен автоматически
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll() // findAll вернет все записи с бд
        return res.json(types)
    }

}
    
module.exports = new TypeController()