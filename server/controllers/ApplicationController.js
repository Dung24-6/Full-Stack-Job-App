const { ApplicationModel } = require("../models/Application");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const applyJob = async (req, res) => {
  const cv = req.body;
  try {
    const jobApplication = new ApplicationModel({
      cv,
    });

    await ApplicationModel.save();

    // Send email notification to company
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_password",
      },
    });

    const mailOptions = {
      from: "your_email@gmail.com",
      to: "company_email@example.com",
      subject: "New job application submitted",
      text: `A new job application has been submitted for job posting $.`,
      attachments: [
        {
          filename: cv.name,
          content: cv.data,
        },
      ],
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
