module.exports = function (sqlz, DataTypes) {
    var variant = sqlz.define('variant', {
        // featured: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: true
        // },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },

        img: {
            type: DataTypes.STRING
        }
    })

    variant.associate = function (db) {
        this.belongsTo(db.subunit)
        this.belongsToMany(db.product, {through: 'variantProducts'})
    }

    variant.addScope('defaultScope', {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    variant.addScope('full', Object.create(null))

    return variant
}
