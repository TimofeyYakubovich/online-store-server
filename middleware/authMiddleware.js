const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") { // если метод OPTIONS то пропускаем нас интересует только GET PUT POST DELETE
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) { // если токена нет то пользователь не авторизован
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY) // провалидируем accessToken вернется тот payload каторый в него вшивали
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован16"})
    }
}