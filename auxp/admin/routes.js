var ctl = require('./ctl'),
    express = require('express'),
    router = express.Router()

router.get('/', ctl.home.view)
router.get('/categories', ctl.categories.view)
router.get('/featured', ctl.featured.view)
router.get('/inv', ctl.inv.view)
router.get('/manufacturers', ctl.manufacturers.view)
router.get('/orders', ctl.orders.view)
router.get('/products', ctl.products.view)

module.exports = router
