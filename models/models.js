// схема как данные будут храниться в бд опишем модели данных
const sequelize = require('../db') // импортируем объект sequelize из db.js
// класс DataTypes описывает типы полей 
const {DataTypes} = require('sequelize')

// модель пользователя у sequelize вызваем функцию define 1 название модели 2 объект с полями
const User = sequelize.define('user', {
    // тип INTEGER, primaryKey: true уазываем что эо первичный ключ, autoIncrement: true автоинрементироваться каждая последующая 
    //запись будет иметь значение на 1 больше предыдущей 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // unique: true уникальный такова же емайла быть не может
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    // defaultValue: "USER" поумолчанию USER похорошему у каждого пользователя должен быть массив ролей
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    // внешние ключи user_id sequelize подставит сам по типам связей
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

// связующая таблица
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // внешние ключи sequelize добавит сам
})

// как модели связаны друг с другом
// обращаемся к модели Device и вызываем соответствующую функцию hasMany или hasOne
// таким образом сообщаем что одна запись Device в базе данных содержит много записей с характеристиками
// Device.hasMany(DeviceInfo)
// для DeviceInfo указываем что эта сущность пренадлежит Device
// DeviceInfo.belongsTo(Device)

// свзя между пользователем и карзиной 1 к 1
User.hasOne(Basket)
// для корзиный вызываем фуннкцию belongsTo передаем в нее User тоесть карзина принадлежит пользователю
Basket.belongsTo(User)

// 1 пользователь может иметь несколько оценок hasMany(Rating)
User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasOne(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'}) // {as: 'info'} указываем название поля каорое будет у массива характеристик
DeviceInfo.belongsTo(Device)

// тип связи между Type и Brand много ко многим функция belongsToMany вызываем для 2 моделей
// но при связи много ко многим создается промежуточная таблица в каторой хронится информация о том какой бренд принадлежит какому типу
// и какой тип связан с каким брендом
// для этого 2 аргументом передаем объект с полем through связующая таблица
Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}