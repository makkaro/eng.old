var ctl = require('./ctl'),
    express = require('express'),
    router = express.Router(),
    upload = require('./middleware/upload')

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
router.post('/products', upload.single('img'), ctl.products.edit)
router.get('/product/del/:id', ctl.products.destroy)
router.get('/product/upload/:id', ctl.products.img_upload_view)
router.post('/product/upload', upload.single('img'), ctl.products.img_upload)
router.get('/inv', ctl.inv.view)
router.get('/inv/:id', ctl.inv.edit_view)
router.post('/inv', ctl.inv.edit)
router.get('/inv/:invId/unit/:id', ctl.inv.edit_unit_view)
router.post('/units', ctl.inv.edit_unit)
router.get('/inv/:invId/unit/:unitId/subunit/:id', ctl.inv.edit_subunit_view)
router.post('/subunits', ctl.inv.edit_subunit)

module.exports = router
