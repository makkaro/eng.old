var express = require('express')

var ctl = require('../ctl')


/* -------------------------------------------------------------------------- */

var router = express.Router()


/* -------------------------------------------------------------------------- */

router.get('/store', ctl.store.view)

router.get('/store/product/:id', ctl.product.view)
router.patch('/store/product', ctl.product.update)

router.get('/store/cart', ctl.cart.view)
router.patch('/store/cart', ctl.cart.update)
router.delete('/store/cart', ctl.cart.destroy)


/* -------------------------------------------------------------------------- */

router.get('/login', ctl.login.view)
router.post('/login', ctl.login.create)
router.delete('/login', ctl.login.destroy)

router.get('/register', ctl.register.view)
router.post('/register', ctl.register.create)


/* -------------------------------------------------------------------------- */

module.exports = router
