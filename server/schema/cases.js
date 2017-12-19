/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cases', {
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
    hospital_name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    case_date: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    doctor_name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    situation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    suggestion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    prescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'cases'
  })
}
