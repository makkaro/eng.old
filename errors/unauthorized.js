var {StatusCodes} = require('http-status-codes')


/* -------------------------------------------------------------------------- */

function Unauthorized(...args) {
    var err = Reflect.construct(Error, args)

    Object.setPrototypeOf(err, Object.getPrototypeOf(this))

    err.statusCode = StatusCodes.UNAUTHORIZED

    return err
}

Unauthorized.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

Object.setPrototypeOf(Unauthorized, Error)

module.exports = Unauthorized
