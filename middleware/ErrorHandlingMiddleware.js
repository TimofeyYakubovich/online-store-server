const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) { // функция сам мидлвеер
    if(err instanceof ApiError) { // если ошибка err является инстансом класса ApiError
        // то возвращаем статус из ошибки и сообщение из err и массив ошибок
        return res.status(err.status).json({message: err.message})
    }
    // если сюда попала ошибка каторая не является инстансом класса ApiError то ошибку мы не предусмотрели
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}