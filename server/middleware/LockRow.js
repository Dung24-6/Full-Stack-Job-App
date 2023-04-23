const { JobsModel } = require('../models/Job')
const db = require('../config/config')
const lockRowMiddleware = async (req, res, next) => {
  const { jobId} = req.params;
  const transaction = await db.transaction()
  try {
    const job = await JobsModel.findOne({
      where: { jobId: jobId },
      lock: { mode: 'ROW SHARE', timeout: 100 },
      transaction: transaction
    })
    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }
    req.transaction = transaction
    req.job = job
    next()
  } catch (err) {
    await transaction.rollback()
    next(err)
  }
}

module.exports = { lockRowMiddleware }
