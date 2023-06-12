// универсальный хендлер
class ApiError extends Error {
    constructor(status, message) { // constructor параметрами принимает статус код и сообщение каторое возвращаем на клиент
        // класс будет расширять Error вызываем родительский конструктор с поощью функции super()
        super();
        this.status = status // присваеваем то чо получили параметрами
        this.message = message;
    }

    // создадим пару static функции это функции каторые можно использовать не создовая экземпляр класса

    // пользователь уазал какие то некаректные парамеры не прошел валидацию и тд.
    static BadRequest(messege) {
        return new ApiError(404, messege); // будет возвращать экземпляр текущего класса передаем сатус код и сообщение
    }
    // таким образом можно создаь несколько функций под разные статус коды
    static internal(messege) {
        return new ApiError(500, messege);
    }

    static forbidden(messege) { // доступа нет
        return new ApiError(403, messege);
    }
}

module.exports = ApiError