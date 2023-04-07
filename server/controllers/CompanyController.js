const { CompanyModel } = require("../models/Company");
const { JobsModel } = require("../models/Job");
const db = require("../config/config");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const getALLCompany = async (req, res) => {
  // const session = JSON.parse(req.cookies.session);
  // const userId = session.user.userId;
  // console.log('\n'+ userId + " test session" +'\n');
  try {
    let page = req.query.page;
    if (page) {
      page = parseInt(page);
      const companies = await CompanyModel.findAndCountAll({
        where: {},
        limit: 2,
        offset: page * 2 - 1,
      });
      return res.status(200).json(companies);
    } else {
      const companies = await CompanyModel.findAll();
      return res.status(200).json(companies);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getTopCompanies = async (req, res) => {
  try {
    const topCompanies = await CompanyModel.findAll({
      attributes: [
        "companyId",
        "name",
        "logo_url",
        [db.fn("count", db.col("jobs.jobId")), "job_count"],
      ],
      include: [
        {
          model: JobsModel,
          as: "jobs", // set the alias for the JobsModel association
          duplicating: false,
          where: {
            // ???
          },
        },
      ],
      group: ["jobs.jobId", "company.companyId"],
      order: [[db.literal("job_count"), "DESC"]],
      limit: 10,
    });
    res.status(200).json(topCompanies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving top companies" });
  }
};

const getById = async (req, res) => {
  const { companyId } = req.params;
  try {
    if (companyId) {
      const companies = await CompanyModel.findOne({
        where: { companyId: companyId },
      });
      return res.status(200).json(companies);
    } else {
      return res.status(200).json("No Company");
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name + email + password);
  if (!(name && email && password)) {
    return res.status(400).json("Not enough params");
  }
  try {
    const exitingCompany = await CompanyModel.findOne({
      where: { email: email },
    });
    if (exitingCompany) {
      res.status(500).json("Email already in use");
    } else {
      const company = await CompanyModel.create({
        name,
        email,
        password,
      });
      return res.json(company);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteCompany = async (req, res) => {
  const { companyId } = req.params;
  try {
    if (companyId) {
      const company = await UsersModel.findOne({
        where: { companyId: companyId },
      });
      await company.destroy();
      return res.status(200).json("Delete successful");
    } else {
      return res.status(200).json("No id");
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json("Missing input");
  }
  try {
    const company = await CompanyModel.findOne({ where: { email: email } });
    if (!company) {
      return res.status(400).json("Email incorrect");
    }
    if (password !== company.password) {
      return res.status(400).json("Password incorrect");
    }
    req.session.company = { companyId: company.companyId };
    res.locals.company = req.session.company;
    console.log(req.session.company);
    return res.json({
      company,
      token: req.session.company,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const logoutCompany = async (req, res) => {
  try {
    delete req.session.company;
    return res.json({ message: "Logged out" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getALLCompany,
  registerCompany,
  loginCompany,
  getById,
  deleteCompany,
  logoutCompany,
  getTopCompanies,
};
