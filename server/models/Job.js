const { DataTypes } = require("sequelize");
const db = require("../config/config");
const { ApplicationModel } = require("./Application");

const JobsModel = db.define(
  "jobs",
  {
    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
    requirement: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    salary: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
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
  },
  {
    freezeTableName: true,
  }
);

JobsModel.hasMany(ApplicationModel, {
  foreignKey: "jobId",
  sourceKey: "jobId",
  onDelete: "cascade",
  onUpdate: "NO ACTION",
  hooks: true,
});


module.exports = { JobsModel };
