const { JobsModel } = require("../models/Job");
const { Op } = require("sequelize");

const createJob = async (req, res) => {
  const { title } = req.body;
  const companyId = req.session.company.companyId;
  if (!(companyId && title)) {
    return res.status(400).json("Not enough params");
  }
  try {
    const job = await JobsModel.create({
      companyId,
      title,
    });
    return res.json(job);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const searchJobByLocations = async (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.status(404).json(" Choose a location ");
  }
  try {
    if (location == "Hà Nội") {
      const jobs = await JobsModel.findAll({ where: { location: location } });
      return res.status(404).json(jobs);
    }
    if (location == "Hồ Chí Minh") {
      const jobs = await JobsModel.findAll({ where: { location: location } });
      return res.status(404).json(jobs);
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const searchJobBySkill = async (req, res) => {
  try {
    const { skills } = req.query;

    // Chuyển skills thành một mảng các skill
    const skillsArr = skills.split(",");

    // Tìm kiếm các công việc có chứa các skill trong mảng skillsArr
    const jobs = await JobsModel.findAll({
      where: {
        skills: { [Op.overlap]: skillsArr },
      },
    });

    return res.status(200).json(jobs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const searchJob = async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(404).json("Enter a prompt to search");
  }

  try {
    const jobs = await JobsModel.findAll({
      where: {
        [Op.or]: [
          { location: { [Op.iLike]: `%${prompt}%` } },
          { skills: { [Op.overlap]: [prompt] } },
          { title: { [Op.iLike]: `%${prompt}%` } },
        ],
      },
    });

    return res.status(200).json(jobs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createJob,
  searchJobByLocations,
  searchJobBySkill,
  searchJob,
};
