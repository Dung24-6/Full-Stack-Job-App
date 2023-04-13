const { ReviewCompanyModel } = require("../models/ReviewCompany");
const { CompanyModel } = require("../models/Company");
const { Op } = require("sequelize");

const getReviewsByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;
    const reviews = await ReviewCompanyModel.findAll({
      where: { companyId: companyId },
    });
    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const createReview = async (req, res) => {
  const session = JSON.parse(req.cookies.session);
  const userId = session.user.userId;
  //const userId = req.session.user.userId;
  const { companyId } = req.params;
  const { rating, comment, title } = req.body;
  if (!(companyId && rating && title && comment && userId)) {
    return res.status(400).json("Not enough params");
  }
  try {
    const company = await CompanyModel.findOne({
      where: { companyId: companyId },
    });
    if (!company) {
      return res.status(400).json("Invalid company id");
    }
    const review = await ReviewCompanyModel.create({
      userId: userId,
      companyId: companyId,
      rating: rating,
      comment: comment,
      title: title,
    });
    return res.status(200).json(review);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await ReviewCompanyModel.findOne({
      where: { reviewId: reviewId },
    });
    if (!review) {
      return res.status(400).json("Invalid review id");
    }
    await review.destroy();
    return res.status(200).json("Delete successful");
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getReviewById = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await ReviewCompanyModel.findOne({
      where: { reviewId: reviewId },
    });
    if (!review) {
      return res.status(400).json("Invalid review id");
    }
    return res.status(200).json(review);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getAverageRatingByCompany = async (req, res) => {
  const { companyId } = req.params;
  try {
    const avgRating = await ReviewCompanyModel.findOne({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "average_rating"],
      ],
      where: { companyId: companyId },
    });
    return res.status(200).json(avgRating);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};



module.exports = {
  getReviewsByCompanyId,
  createReview,
  deleteReview,
  getReviewById,
  getAverageRatingByCompany,
};
