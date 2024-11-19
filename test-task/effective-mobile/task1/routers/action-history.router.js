const Router = require('express')
const router = new Router()
const actionHistoryController = require('../controllers/action-history.controller')

router.post('/', actionHistoryController.createAction)
router.get('/shop_id', actionHistoryController.getHistoryWithShopId)
router.get('/plu', actionHistoryController.getHistoryWithPLU)
router.get('/date', actionHistoryController.getHistoryWithDate)
router.get('/action', actionHistoryController.getHistoryWithAction)


module.exports = router