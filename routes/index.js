var express = require('express')

var store_ctl = require('../ctl/store')

var router = express.Router()

router.get('/store', store_ctl.index)

module.exports = router
