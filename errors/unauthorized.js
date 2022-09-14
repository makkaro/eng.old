var {StatusCodes} = require('http-status-codes')

/* -------------------------------------------------------------------------- */

function unauthorized(...args) {
    var err = Reflect.construct(Error, args)
    Reflect.setPrototypeOf(err, Reflect.getPrototypeOf(this))

    err.statusCode = StatusCodes.UNAUTHORIZED

    return err
}

unauthorized.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

Reflect.setPrototypeOf(unauthorized, Error)

module.exports = unauthorized
