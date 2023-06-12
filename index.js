// npm install express pg pg-hstore sequelize cors dotenv
// pg pg-hstore модули для системы упавление бд PostgreSQL
// cors что бы с браузера отправлять запросы без проблем
// Sequelize - ORM для реляционных баз данных на node js
// ORM это технология каторая позволяет связывать прграмный код с бд тоесть что бы не писать напрямую sql запросы а вызывать готовые функции
// npm i -D nodemon
require('dotenv').config()
// require('dotenv').config() для того что бы прочитать файл .env
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models') // импортируем все модели
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const ErrorHandling = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({
    // надо указать с каким доеном ему надо обмениваться куками
    // credentials: true, // разрешаем куки
    // origin: process.env.CLIENT_URL // указываем юрл фронтенда
}))
app.use(express.json());
// что бы файла из папки static раздавать как статику в функцию static передаем путь до папки
// теперь все файлы в папке static можно получаь через http://localhost:5000/6bde9a46-758c-49bd-9862-2203c9a10847.jpg в браузере
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router)

// когда подключаем мидлвеер для обработки ошибок он обезательно должен идти последним в цепочке мидлвееров
// поэтому внутри него нигде не вызывается функция next() так как на нем работа прекращается
app.use(ErrorHandling)

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Working!!!'})
// })


const start = async () => {
    try {
        await sequelize.authenticate() // authenticate устанавливает подключение к базе данных 
        await sequelize.sync() // sync сверяет состояние бд со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();
