var ctl = require('./ctl'),
    express = require('express'),
    router = express.Router()

router.get('/', ctl.home.view)
router.get('/categories', ctl.categories.view)
router.get('/category/:id', ctl.categories.edit_view)
router.post('/categories', ctl.categories.edit)
router.get('/category/del/:id', ctl.categories.destroy)
router.get('/featured', ctl.featured.view)
router.get('/inv', ctl.inv.view)
router.get('/manufacturers', ctl.manufacturers.view)
router.get('/manufacturer/:id', ctl.manufacturers.edit_view)
router.post('/manufacturers', ctl.manufacturers.edit)
router.get('/manufacturer/del/:id', ctl.manufacturers.destroy)
router.get('/orders', ctl.orders.view)
router.get('/products', ctl.products.view)
router.get('/product/:id', ctl.products.edit_view)
router.post('/products', ctl.products.edit)
router.get('/product/del/:id', ctl.products.destroy)

module.exports = router
