const Router = require('express')
const router = new Router();
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create) // что бы бренд создавать
router.get('/', brandController.getAll) // что бы все бренды получать


module.exports = router;