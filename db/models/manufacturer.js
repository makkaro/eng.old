module.exports = function (sqlz, DataTypes) {
    var manufacturer = sqlz.define('manufacturer', {
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
    manufacturer.associate = function (models) {
        this.hasMany(models.product)
    }
    return manufacturer
}
