const { DataTypes } = require("sequelize");
const db = require("../config/config");

const UsersModel = db.define(
  "users",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
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
      defaultValue: 'user',
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cv: {
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
    skill: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    birth: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    sex: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    about: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    experience: {
      type: DataTypes.INTEGER,
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

module.exports = { UsersModel };
