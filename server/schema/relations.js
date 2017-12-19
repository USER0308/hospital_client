/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relations', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    relation_name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    relation_phone: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    relation: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    tableName: 'relations'
  })
}
