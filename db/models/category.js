module.exports = function (sqlz, DataTypes) {
    var category = sqlz.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
    category.associate = function (models) {
        this.hasMany(models.product)
    }
    return category
}
