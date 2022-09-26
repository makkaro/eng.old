var {StatusCodes} = require('http-status-codes')


/* -------------------------------------------------------------------------- */

function BadRequest(...args) {
    var err = Reflect.construct(Error, args)

    Object.setPrototypeOf(err, Object.getPrototypeOf(this))

    err.statusCode = StatusCodes.BAD_REQUEST

    return err
}

BadRequest.prototype = Object.create(Error.prototype, {
    constructor: {
        value: Error,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

Object.setPrototypeOf(BadRequest, Error)

module.exports = BadRequest
