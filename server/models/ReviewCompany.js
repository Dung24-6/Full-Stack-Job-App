const { DataTypes } = require("sequelize");
const db = require("../config/config");
const { CompanyModel } = require("./Company");
const { UsersModel } = require("./User");
const { ReportReviewModel } = require("./ReportReview");

const ReviewCompanyModel = db.define(
  "reviewCompany",
  {
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CompanyModel,
        key: "companyId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UsersModel,
        key: "userId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    comment: {
      type: DataTypes.STRING(600),
      allowNull: true,
    },
    title: {
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

ReviewCompanyModel.hasMany(ReportReviewModel, {
  foreignKey: "reviewId",
  sourceKey: "reviewId",
  onDelete: "cascade",
  onUpdate: "NO ACTION",
  hooks: true,
});

module.exports = { ReviewCompanyModel };
