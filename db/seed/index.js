var crypto = require('crypto'),
    db = require('..')

module.exports = async function () {
    var salt = crypto.randomBytes(16)

    await db.user.create({
        login: 'alice',
        pass: crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256'),
        salt: salt
    })
}

