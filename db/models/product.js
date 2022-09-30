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
            defaultValue: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg' // TODO
        }
    })

    product.associate = function (db) {
        this.belongsTo(db.category)
        this.belongsTo(db.manufacturer)
        this.belongsToMany(db.user, {through: db.item})
    }

    product.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    product.addScope('full', Object.create(null))

    return product
}
