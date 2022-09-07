module.exports = function (sqlz, DataTypes) {
    var product = sqlz.define('product', {
        hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'product-def.png'
        }
    })
    product.associate = function (models) {
        this.belongsTo(models.category)
        this.belongsTo(models.manufacturer)
        this.belongsToMany(models.cart, {through: models.cart_item})
    }
    return product
}
