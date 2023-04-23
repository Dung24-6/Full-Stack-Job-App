const express = require('express')
const router = express.Router()
const JobController = require('../controllers/JobController')
const checkAdmin = require('../middleware/checkAdmin')
const lockRowMiddleware = require('../middleware/LockRow')
router.post('/createJob', JobController.createJob)

router.get('/searchJobByLocation', JobController.searchJobByLocations)

router.get('/searchJob', JobController.searchJob)

router.get("/searchJobBySkill", JobController.searchJobBySkill);

router.get("/searchJobById/:jobId", JobController.searchJobById);

router.get('/searchJobByCompany/:companyId', JobController.searchJobByCompany)

router.get('/searchAllJob', JobController.searchAllJob)

router.delete('/:jobId', JobController.deleteJob)

router.get('/getJobCount', checkAdmin.checkAdmin, JobController.getJobCount)

router.put('/updateJob/:jobId', JobController.updateJob)

module.exports = router
