const { JobsModel } = require("../models/Job");

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

module.exports = {
  createJob,
  searchJobByLocations,
};
