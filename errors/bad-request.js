var {StatusCodes} = require('http-status-codes')

/* -------------------------------------------------------------------------- */

function bad_request(...args) {
    var err = Reflect.construct(Error, args)
    Reflect.setPrototypeOf(err, Reflect.getPrototypeOf(this))

    err.statusCode = StatusCodes.BAD_REQUEST

    return err
}

bad_request.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

Reflect.setPrototypeOf(bad_request, Error)

module.exports = bad_request
