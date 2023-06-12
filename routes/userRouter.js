const Router = require('express')
const router = new Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
// router.get('/auth', (req, res) => {
//         res.status(200).json({message: 'auth Working!!!'})
//     }) 
router.get('/auth', authMiddleware, userController.check) // что бы проверять авторизован пользователь или нет


module.exports = router;