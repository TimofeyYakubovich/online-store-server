// сконфигурируем подключение к бд
// импортируем класс Sequelize из модуля sequelize
const {Sequelize} = require('sequelize')

module.exports = new Sequelize( // экспортируем объект созданый из класса Sequelize
// все настройки подключения к бд в переменных окружения
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
    
)