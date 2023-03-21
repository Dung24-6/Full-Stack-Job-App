const { DataTypes } = require("sequelize");
const db = require("../config/config");

const ApplicationModel = db.define("application", {
  applicationId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cv: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  update_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = { ApplicationModel };
