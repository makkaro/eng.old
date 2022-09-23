var express = require('express')

var ctl = require('../ctl')

/* -------------------------------------------------------------------------- */

var router = express.Router()

router.get('/', ctl.store.get)
router.get('/product/:id', ctl.product.view)
router.patch('/product', ctl.product.update)
router.get('/login', ctl.login.get)
router.post('/login', ctl.login.post)
router.post('/logout', ctl.logout.post)
router.get('/register', ctl.register.get)
router.post('/register', ctl.register.post)
router.get('/cart', ctl.cart.get)

module.exports = router
