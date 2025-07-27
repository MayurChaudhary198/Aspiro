const express = require('express');
const router = express.Router();
const { postJob, getAllJobs, getMyJobs, applyForJob, getAppliedJobs, searchJobs, updateJob, deleteJob } = require('../controllers/jobController');
const protect = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

router.get('/', getAllJobs);
router.post('/post', protect, postJob);
router.get('/my-jobs', protect, getMyJobs);
router.post('/apply/:jobId', protect, applyForJob);
router.get('/applied-jobs', protect, getAppliedJobs);
router.get('/search', searchJobs);
router.put('/:jobId', protect, updateJob);
router.delete('/:jobId', protect, deleteJob);

module.exports = router;