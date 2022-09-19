require('dotenv').config()

var chance = new (require('chance'))

var db = require('../db')

/* -------------------------------------------------------------------------- */

chance.mixin({
    category: () => ({
        hidden: chance.bool({likelihood: 0}),
        name: chance.word()
    }),
    manufacturer: () => ({
        hidden: chance.bool({likelihood: 0}),
        name: chance.company()
    }),
    product: () => ({
        hidden: chance.bool(),
        name: chance.word(),
        cost: chance.floating({min: 0, max: 9999.99, fixed: 2})
    })
})

async function seed() {
    Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)]
    }

    function generator(model, amt) {
        return async function* () {
            for (var i = 0; i < amt; ++i) {
                yield await db[model].create(chance[model]())
            }
        }
    }

    async function entities(model, amt) {
        var entities = Array()

        for await (var value of await generator(model, amt)()) {
            entities.unshift(value)
        }

        return entities
    }

    var categories = await entities('category', 6),
        manufacturers = await entities('manufacturer', 8),
        products = await entities('product', 30)


    products.forEach(product => { with (product) {
        setCategory(categories.random())
        setManufacturer(manufacturers.random())
    }})

    await db.user.create({username: 'genghis', password: 'genghis1'})

    delete Array.prototype.random
}

async function init() {
    await db.sqlz.sync({force: true})

    await seed()
}

void init()
