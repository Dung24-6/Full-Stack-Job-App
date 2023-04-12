const { ApplicationModel } = require("../models/Application");
const { UsersModel } = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

const applyJob = async (req, res) => {
  const { jobId, description ,companyId } = req.body;
  const session = JSON.parse(req.cookies.session);
  const userId = session.user.userId;

  try {
    const user = await UsersModel.findOne({ where: { userId: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const jobApplication = new ApplicationModel({
      jobId,
      userId,
      description,
      companyId,
      cv: user.cv,
    });

    await jobApplication.save();

    // Send email notification to company
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hadung24062002@gmail.com",
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: "hadung24062002@gmail.com",
      to: "hadung24062002@gmail.com",
      subject: "New job application submitted",
      text: "This is a test email",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).send(jobApplication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getApplyJobByUserId = async (req, res) => {
  const session = JSON.parse(req.cookies.session);
  const userId = session.user.userId;

  try {
    const jobApplications = await ApplicationModel.findAll({
      where: { userId: userId },
    });
    return res.status(200).json(jobApplications);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getApplyJobByCompany = async (req, res) => {
  const session = JSON.parse(req.cookies.session);
  const companyId = session.company.companyId;

  try {
    const applications = await ApplicationModel.findAll({
      where: { companyId: companyId },
    });
    return res.status(200).json(applications);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteApplyJob = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await ApplicationModel.findOne({
      where: { applicationId: applicationId },
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    await application.destroy();

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getApplyJobByApplyId = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await ApplicationModel.findOne({
      where: { applicationId: applicationId },
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    return res.status(200).json(application);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};



module.exports = {
  applyJob,
  getApplyJobByUserId,
  getApplyJobByCompany,
  deleteApplyJob,
  getApplyJobByApplyId,
};
