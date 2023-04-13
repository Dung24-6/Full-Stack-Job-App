const { ReportReviewModel } = require("../models/ReportReview");
const { ReviewCompanyModel } = require("../models/ReviewCompany");
const { Op } = require("sequelize");

const reportReview = async (req, res) => {
  // const session = JSON.parse(req.cookies.session);
  // const userId = session.user.userId;
  const userId = req.session.user.userId;
  const { reviewId } = req.params;
  const { reason , comment} = req.body;
  if (!(reviewId && reason && userId)) {
    return res.status(400).json("Not enough params");
  }
  try {
    const review = await ReviewCompanyModel.findOne({
      where: { reviewId: reviewId },
    });
    if (!review) {
      return res.status(400).json("Invalid review id");
    }
    const report = await ReportReviewModel.create({
      userId: userId,
      reviewId: reviewId,
      reason: reason,
      comment: comment,
      companyId: review.companyId,
    });
    return res.status(200).json(report);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getReportsByReviewId = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const reports = await ReportReviewModel.findAll({
      where: { reviewId: reviewId },
    });
    return res.status(200).json(reports);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteReport = async (req, res) => {
  const { reportId } = req.params;
  try {
    const report = await ReportReviewModel.findOne({
      where: { reportId: reportId },
    });
    if (!report) {
      return res.status(400).json("Invalid report id");
    }
    await report.destroy();
    return res.status(200).json("Delete successful");
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getAllReport = async (req, res) => {
  try {
    const reports = await ReportReviewModel.findAll();
    return res.status(200).json(reports);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getReportByID = async (req, res) => {
  const { reportId } = req.params;
  try {
    const report = await ReportModel.findOne({
      where: { reportId: reportId },
    });
    if (!report) {
      return res.status(400).json("Invalid report id");
    }
    return res.status(200).json(report);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  reportReview,
  getReportsByReviewId,
  deleteReport,
  getAllReport,
  getReportByID,
};
