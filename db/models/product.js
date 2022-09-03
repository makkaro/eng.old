var path = path || require('path')

module.exports = function (sqlz, DataTypes) {
    var product = sqlz.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'def' // TODO
        }
    })
    product.associate = function (models) {
        this.belongsTo(models.category)
        this.belongsTo(models.manufacturer)
    }
    return product
}
