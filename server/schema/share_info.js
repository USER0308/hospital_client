/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_info', {
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
    marriage: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    resident: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    pin: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    birthplace: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    occupation: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    anaphylactogen: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: '无'
    },
    infectiousDiseaseHistory: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: '无'
    },
    geneticDiseaseHistory: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: '无'
    }
  }, {
    tableName: 'share_info'
  })
}
