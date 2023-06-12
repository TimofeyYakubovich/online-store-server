const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY, 
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.BadRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.BadRequest('пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        // сразу же для пользователя создаем карзину
        const basket = await Basket.create({userId: user.id})
        // const token = jwt.sign(
        //     {id: user.id, email, role}, 
        //     process.env.SECRET_KEY, 
        //     {expiresIn: '24h'}
        // )
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.BadRequest('пользователь с таким email не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        // res.json('rgtgtgthth')
        // const query = req.query
        // const {id} = req.query
        // // res.json(query)
        // // res.json(query.id)
        // if (!id) {
        //     return next(ApiError.BadRequest('не задан ID'))
        // }
        // res.json(id)
        // res.json({message: "ALL RIGHT"})

        // функция check будет просто генерировать новый токен и отправить его обратно на клиент
        // если пользователь постоянно использует свой аккаунт окен у него будет перезаписываться
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})

    }

}
    
module.exports = new UserController()