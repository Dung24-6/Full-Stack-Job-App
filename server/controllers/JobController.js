const { JobsModel } = require('../models/Job')
const { Op } = require('sequelize')
const db = require('../config/config')

const createJob = async (req, res) => {
  const { title, salary, requirement, description } = req.body
  const session = JSON.parse(req.cookies.session)
  const companyId = session.company.companyId
  // const companyId = req.session.company.companyId;
  if (!(companyId && title && salary && requirement && description)) {
    return res.status(400).json('Not enough params')
  }
  try {
    const job = await JobsModel.create({
      companyId,
      title,
      salary,
      requirement,
      description
    })
    return res.json(job)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const searchJobByLocations = async (req, res) => {
  const { location } = req.query
  if (!location) {
    return res.status(404).json(' Choose a location ')
  }
  try {
    if (location == 'Hà Nội') {
      const jobs = await JobsModel.findAll({ where: { location: location } })
      return res.status(404).json(jobs)
    }
    if (location == 'Hồ Chí Minh') {
      const jobs = await JobsModel.findAll({ where: { location: location } })
      return res.status(404).json(jobs)
    }
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

const searchJobBySkill = async (req, res) => {
  const { skills } = req.query
  if (!req.query.skills) {
    return res.status(400).json({ error: 'Missing skills parameter' })
  }
  if (typeof req.query.skills !== 'string') {
    return res.status(400).json({ error: 'Invalid skills parameter' })
  }

  try {
    // Chuyển skills thành một mảng các skill
    const skillsArr = skills.split(',')

    // Tìm kiếm các công việc có chứa các skill trong mảng skillsArr
    const jobs = await JobsModel.findAll({
      where: {
        skills: { [Op.overlap]: skillsArr }
      }
    })

    return res.status(200).json(jobs)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const searchJob = async (req, res) => {
  const { prompt } = req.query

  if (!prompt) {
    return res.status(404).json('Enter a prompt to search')
  }

  try {
    const jobs = await JobsModel.findAll({
      where: {
        [Op.or]: [
          { location: { [Op.iLike]: `%${prompt}%` } },
          { skills: { [Op.iLike]: `%${prompt}%` } },
          { title: { [Op.iLike]: `%${prompt}%` } },
          { description: { [Op.iLike]: `%${prompt}%` } }
        ]
      }
    })

    return res.status(200).json(jobs)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const searchJobById = async (req, res) => {
  const { jobId } = req.params
  if (!jobId) {
    return res.status(400).json('Job ID is missing')
  }
  try {
    const job = await JobsModel.findByPk(jobId)
    if (!job) {
      return res.status(404).json('Job not found')
    }
    return res.status(200).json(job)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const searchJobByCompany = async (req, res) => {
  const { companyId } = req.params
  if (!companyId) {
    return res.status(404).json('Choose a company ID')
  }
  try {
    const jobs = await JobsModel.findAll({ where: { companyId } })
    return res.status(200).json(jobs)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const searchAllJob = async (req, res) => {
  try {
    const jobs = await JobsModel.findAll({
      order: db.fn('RANDOM') // order randomly
    })
    return res.status(200).json(jobs)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const deleteJob = async (req, res) => {
  const { jobId } = req.params
  if (!jobId) {
    return res.status(400).json('Job ID is missing')
  }
  try {
    const job = await JobsModel.findByPk(jobId)
    if (!job) {
      return res.status(404).json('Job not found')
    }
    await job.destroy()
    return res.status(200).json('Job deleted successfully')
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

// Tổng số lượng công việc đăng tải
const getJobCount = async (req, res) => {
  try {
    const count = await JobsModel.count()
    console.log(count)
    return res.status(200).json(count)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const updateJob = async (req, res) => {
  const { jobId } = req.params
  const { title, salary, requirement, description } = req.body

  if (!(title && salary && requirement && description)) {
    return res.status(400).json('Not enough params')
  }

  try {
    const job = await JobsModel.findByPk(jobId)
    if (!job) {
      return res.status(404).json('Job not found')
    }
    const updatedJob = await job.update({
      title,
      salary,
      requirement,
      description
    })
    return res.status(200).json(updatedJob)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

module.exports = {
  createJob,
  searchJobByLocations,
  searchJobBySkill,
  searchJob,
  searchJobById,
  searchJobByCompany,
  searchAllJob,
  deleteJob,
  getJobCount,
  updateJob
}
