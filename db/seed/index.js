var Chance = require('chance'),
    chance = new Chance

chance.mixin({
    category: () => ({
        name: chance.word(),
        hidden: chance.bool()
    }),
    manufacturer: () => ({
        name: chance.company(),
        hidden: chance.bool()
    }),
    product: () => ({
        name: chance.word(),
        hidden: chance.bool(),
        cost: chance.floating({ min: 0, max: 9999.99, fixed: 2 })
    })
})

module.exports = async function (db, amt = 5) {
    for (var i = 0; i < amt; ++i) {
        var category     = await db.category.create(chance.category()),
            manufacturer = await db.manufacturer.create(chance.manufacturer()),
            product      = await db.product.create(chance.product())

        product.setCategory(category)
        product.setManufacturer(manufacturer)
    }
}
