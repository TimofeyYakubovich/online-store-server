// index.js объеденяет все маршруты попдроутеры для брендов типов устройств и тд.
const Router = require('express')
const router = new Router();
const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')

// указываем все попдроутеры у router вызываем функцию use 1 указываем юрл по каторому подроутер будет отрабатывать 2 сам подроутер
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)


module.exports = router;