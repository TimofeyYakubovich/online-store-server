const uuid = require('uuid')
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            // info массиф инфрмации характеристик
            let {name, price, brandId, typeId, info} = req.body;
            // из поля files достем картинку
            // устанавливам пакет npm i express-fileupload для работы с файлами
            const {img} = req.files
            // после того как файл получили надо для него сгенерировать уникальное имя что бы по этому имени этот файл могли получать
            // для этого устанавливам пакет npm i uuid
            let fileName = uuid.v4() + ".jpg"
            // что бы файл после получения переместить в папку static вызываем функцию mv() сдесь можно прост указать путь C/userdesc но это бред
            // импортируем модуль path у него вызываем функцию resolve каторая адаптирует указаный путь к ОС
            // в нее 1 передаем __dirname это путь до текущей папке с конроллерами 2 '..' что бы вернуться на директорию назад
            // 3 папку static таким образом переместим файл с заданым именем в нужную папку
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            // создаем сам device в бд rating не указываем так как подефолту он 0
            const device = await Device.create({name, price, brandId, typeId, img: fileName}) // как img передаем название файла

            if(info) { // если инфо пришло в теле запроса
                // когда передаются данные через formdata они приходят ввиде строки поэтому этот массив будем парсить
                // на фронте в json строку а на беке обратно перегонять в js объект
                info = JSON.parse(info)
                info.forEach(i => { // после того как распарсили массив пробегаемся по нему forEach
                    DeviceInfo.create({ // и для каждого элимента массива вызываем функцию create await не ставим что бы не блокировать весь паток
                        title: i.title,
                        description: i.description,
                        deviceId: device.id // в deviceId передаем id из уже созданого device
                    })
                });
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        // const {brandId, typeId} = req.query;
        // let devices;
        // если brandId и typeId не указаны будем возвращать все девайсы
        // если какой то 1 указан будем делать фильтрацию

        // если типов и брендов относитеьно небольшое количество и какой то постраничный вывод делать не нужно
        // то устройств может быть 100 1000 и отображать все на одной странице не разумно
        // сделаем постраничный вывод добавим 2 параметра limit количество устройств на одной странице page текущая страница

        let {brandId, typeId, limit, page} = req.query;
        page = page || 1 // если страница не указана подефолту 1
        limit = limit || 9 // если лимит не указан будем отправлять по 9 устройств на каждой странице
        // отступ допустим мы перешли на 2 странцу и первые 9 товаров надо пропустить
        // получается если 2 страница 2 * 9 - 9 = 9
        let offset = page * limit - limit
        let devices;
        
        if (!brandId && !typeId) {
            // что бы посчиать количество страниц на фронте надо знать общее количество товаров каторое вернется по запросу
            // для этого используем функцию findAndCountAll она предназначена для погинации
            // в поле "count": 2, будет приходить количество товаров попадающих под параметры brandId, typeId 
            // в поле "rows" получаем только те товары каторые соответствуют limit, page
            // devices = await Device.findAll({limit, offset})
            devices = await Device.findAndCountAll({limit, offset})
        }

        if (brandId && !typeId) { // если есть бренд но нету типа то будем делать фильтрацию только по бренду
            // в поле where: передаем объект с полями {brandId} поля по каторым будет искать
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset}) // в объект опций добовляем limit, offset
        }

        if (!brandId && typeId) { // если есть тип но нету брена то будем делать фильтрацию только по тип
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }

        if (brandId && typeId) { 
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }

        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id}, // в объект опций передаем  id
                // этот запрос будет отрабатывать когда открывается страница детального просмотра устройтсва
                // поэтому надо сразу подгружать массив с характеристики
                // для этого используется поле include указываем модель каторую хотим подгрузить DeviceInfo и название поля каторое будет в этом объекте
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device)
    }

}
    
module.exports = new DeviceController()