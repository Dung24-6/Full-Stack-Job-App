const { DataTypes } = require("sequelize");
const db = require("../config/config");
const { JobsModel } = require("./Job");
const { ReviewCompanyModel } = require("./ReviewCompany")

const CompanyModel = db.define(
  "company",
  {
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "company",
    },
    logo_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    website_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
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

CompanyModel.hasMany(JobsModel, {
  foreignKey: "companyId",
  sourceKey: "companyId",
  onDelete: "cascade",
  onUpdate: "NO ACTION",
  hooks: true,
});

CompanyModel.hasMany(ReviewCompanyModel, {
  foreignKey: "companyId",
  sourceKey: "companyId",
  onDelete: "cascade",
  onUpdate: "NO ACTION",
  hooks: true,
});

JobsModel.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  targetKey: "companyId",
  onDelete: "cascade",
  onUpdate: "NO ACTION",
});

ReviewCompanyModel.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  targetKey: "companyId",
  onDelete: "cascade",
  onUpdate: "NO ACTION",
});

module.exports = { CompanyModel };
