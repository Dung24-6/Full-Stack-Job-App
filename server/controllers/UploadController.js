const { UsersModel } = require("../models/User");
const { CompanyModel } = require("../models/Company");
const jwt = require("jsonwebtoken");

const uploadAvatar = async (req, res) => {
  console.log(req.cookies.session);
   const session = JSON.parse(req.cookies.session);
   const userId = session.user.userId;
  //const userId = req.session.user.userId
  try {
    
    const user = await UsersModel.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.file) {
      user.avatar_url = req.file.path;
      await user.save();

      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "No file uploaded" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const uploadCV = async (req, res) => {
  try {
     const session = JSON.parse(req.cookies.session);
     const userId = session.user.userId;
    const user = await UsersModel.findOne({ where: { userId: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.file) {
      user.cv = req.file.path;
      await user.save();

      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "No file uploaded" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const uploadLogo = async (req, res) => {
  try {
    const companyId = req.session.company.companyId;
    const company = await CompanyModel.findOne({ where: { companyId } });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    if (req.file) {
      company.logo_url = req.file.path;
      await company.save();

      return res.status(200).json(company);
    } else {
      return res.status(400).json({ error: "No file uploaded" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadAvatar,
  uploadCV,
  uploadLogo,
};
