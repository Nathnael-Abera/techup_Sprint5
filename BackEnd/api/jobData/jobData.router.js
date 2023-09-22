const express = require('express')
const { createJob, getJob, updateJob, deleteJob,filterJobs,getSortedJob,getJobById,getSortByDate} = require('./jobData.controller')
const router = express.Router()

const auth = require('../../middleWare/auth')
const isAdmin= require('../../middleWare/adminAuth')


router.route('/filter').get(auth,filterJobs)
router.route('/').get(auth,getJob).post(auth,isAdmin,createJob)
router.route('/sort').get(auth,getSortedJob)
router.route('/sortdate').get(auth,getSortByDate)
router.route('/:id').put(auth,isAdmin,updateJob).delete(auth,isAdmin,deleteJob).get(auth,isAdmin,getJobById)


module.exports = router