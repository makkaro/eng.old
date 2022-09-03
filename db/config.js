process.env.DOTENV || require('dotenv').config()

module.exports = {
    development: {
        database : process.env.DEVEL_DB_NAME,
        username : process.env.DEVEL_DB_USER,
        password : process.env.DEVEL_DB_PASS,
        host     : 'localhost',
        dialect  : 'postgres',
        logging  : false
    }
}
