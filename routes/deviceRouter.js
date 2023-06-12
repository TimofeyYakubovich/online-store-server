const Router = require('express')
const router = new Router();
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create) // что бы дивайс создавать
router.get('/', deviceController.getAll) // что бы все дивайс получать
router.get('/:id', deviceController.getOne) // что бы конкретный дивайс получать


module.exports = router;