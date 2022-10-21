module.exports = function (sqlz, DataTypes) {
    var product = sqlz.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        img : {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '/products/default.jpg'
        }
    })

    product.associate = function (db) {
        this.belongsTo(db.category)
        this.belongsTo(db.manufacturer)
        this.belongsToMany(db.user, {through: db.item})
        this.belongsToMany(db.element, {through: 'elementProducts'})
        this.belongsToMany(db.variant, {through: 'variantProducts'})
    }

    product.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    product.addScope('full', Object.create(null))

    return product
}
