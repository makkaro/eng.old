var ctl = require('./ctl'),
    express = require('express'),
    router = express.Router()

router.get('/', ctl.home.view)

module.exports = router
