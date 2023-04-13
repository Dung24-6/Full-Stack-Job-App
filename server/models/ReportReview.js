const { DataTypes } = require("sequelize");
const db = require("../config/config");
const { CompanyModel } = require("./Company");
const { UsersModel } = require("./User");
const { ReviewCompanyModel } = require("./ReviewCompany");

const ReportReviewModel = db.define(
  "reportReview",
  {
    reportId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: ReviewCompanyModel,
        key: "reviewId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    reason: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(1000),
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

module.exports = { ReportReviewModel };
