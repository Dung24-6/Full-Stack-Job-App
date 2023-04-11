const { ApplicationModel } = require("../models/Application");
const nodemailer = require("nodemailer");
require("dotenv").config();

const applyJob = async (req, res) => {
  const { jobId , description } = req.body;
  const userId = req.session.user.userId;

  try {
    const jobApplication = new ApplicationModel({
      jobId,
      userId,
      description,
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

module.exports = {
  applyJob,
};
