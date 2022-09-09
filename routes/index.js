var express = require('express'),
    ctl = require('../ctl')

var router = express.Router()

router.get('/store', ctl.store.view)

module.exports = router
