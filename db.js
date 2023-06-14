// сконфигурируем подключение к бд
// импортируем класс Sequelize из модуля sequelize
const {Sequelize} = require('sequelize')

// module.exports = new Sequelize( // экспортируем объект созданый из класса Sequelize
// // все настройки подключения к бд в переменных окружения
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
    
// )

// psql         "postgres://default:kExl0ZB2yUPQ@ep-raspy-tooth-964057.us-east-1.postgres.vercel-storage.com:5432/verceldb"
// POSTGRES_URL="postgres://default:kExl0ZB2yUPQ@ep-raspy-tooth-964057-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"

module.exports = new Sequelize('postgres://default:kExl0ZB2yUPQ@ep-raspy-tooth-964057.us-east-1.postgres.vercel-storage.com:5432/verceldb', {
// module.exports = new Sequelize(process.env.POSTGRES_PRISMA_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // <<<<<< YOU NEED THIS
            sslmode: require
        }
    }
})