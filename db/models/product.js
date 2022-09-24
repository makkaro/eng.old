module.exports = function (sqlz, DataTypes) {
    var Product = sqlz.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        img : {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg' // TODO
        }
    })

    Product.addScope('defaultScope', {
        attributes: {include: Array('id', 'name', 'cost', 'img')}
    })

    Product.addScope('full', {})

    Product.associate = function (db) {
        this.belongsTo(db.Category)
        this.belongsTo(db.Manufacturer)
        this.belongsToMany(db.User, {through: db.Item})
    }

    return Product
}
