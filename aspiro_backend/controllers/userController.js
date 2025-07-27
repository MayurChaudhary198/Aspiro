const User  = require('../models/User.js');
const Job = require('../models/jobModel');


const getProfile =async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error('Error in getProfile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}



const getCandidateDashboard = async (req, res) => {
    try {
        if (req.user.role !== 'candidate') {
            return res.status(403).json({ message: 'Access denied. Only candidates can view this.' });
        }

        const user = await User.findById(req.user._id).select('-password');

        const appliedJobs = await Job.find({ applicants: req.user._id });

        res.status(200).json({
            user,
            appliedJobs,
            totalApplications: appliedJobs.length
        });

    } catch (error) {
        console.error('Error in getCandidateDashboard:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getEmployerDashboard = async (req, res) => {
    try {
        if (req.user.role !== 'employer') {
            return res.status(403).json({ message: 'Access denied. Only employers can view this.' });
        }

        const user = await User.findById(req.user._id).select('-password');

        const jobs = await Job.find({ postedBy: req.user._id });

        // Optionally include applicant count per job
        const jobsWithApplicantCount = jobs.map(job => ({
            _id: job._id,
            title: job.title,
            company: job.company,
            location: job.location,
            applicantsCount: job.applicants.length
        }));

        res.status(200).json({
            user,
            postedJobs: jobsWithApplicantCount,
            totalJobs: jobs.length
        });

    } catch (error) {
        console.error('Error in getEmployerDashboard:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
 
module.exports = { getProfile, getCandidateDashboard, getEmployerDashboard };