const Router = require('express')
const router = new Router()
const remainController = require('../controllers/remain.controller')

router.post('/', remainController.createRemain)
router.put('/', remainController.updateRemain)
router.get('/plu', remainController.getRemainWithPLU)
router.get('/shop', remainController.getRemainWithShopId)
router.get('/order', remainController.getRemainOrder)
router.get('/left', remainController.getRemainLeft)

module.exports = router