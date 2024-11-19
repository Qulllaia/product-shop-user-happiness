const Router = require('express')
const router = new Router()
const productController = require('../controllers/product.controller')

router.post('/', productController.createProduct)
router.get('/name', productController.getWithName)
router.get('/plu', productController.getWithPLU)

module.exports = router