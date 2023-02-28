const { CompanyModel } = require("../models/Company");
const jwt = require("jsonwebtoken");

const getALLCompany = async (req, res) => {
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
      message: "Login ok",
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
};
