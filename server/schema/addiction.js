/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addiction', {
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
    smoke: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    alcohol: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    tableName: 'addiction'
  })
}
