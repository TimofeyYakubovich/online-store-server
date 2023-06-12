const jwt = require('jsonwebtoken')
// мидлввер будет ограничивать доступ простым пользователям к созданию типов брендов устройств и тд.
module.exports = function(role) { // отсюда будем экспортировать функцию каторая принимает параметро только роль и уже она будет возвращать
    // функцию мидлвеер
    return function (req, res, next) {
        if (req.method === "OPTIONS") { // если метод OPTIONS то пропускаем нас интересует только GET PUT POST DELETE
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) { // если токена нет то пользователь не авторизован
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY) // провалидируем accessToken вернется тот payload каторый в него вшивали
            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован16"})
        }
    }
}