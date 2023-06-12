const Router = require('express')
const router = new Router();
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create) // что бы типы создавать
router.get('/', typeController.getAll) // что бы все типы получать


module.exports = router;