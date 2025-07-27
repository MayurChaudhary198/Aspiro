const Job = require("../models/jobModel");

const postJob = async (req, res) => {
  try {
    const { title, company, location, salary, description, requirements } =
      req.body;

    const job = new Job({
      title,
      company,
      location,
      salary,
      description,
      requirements,
      postedBy: req.user._id,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    console.error("Error in postJob:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json(myJobs);
  } catch (error) {
    console.error("Error in getMyJobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user?._id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (req.user.role !== "candidate") {
      return res.status(403).json({ message: "Only candidates can apply" });
    }

    // Defensive: Make sure job.applicants is an array
    if (!Array.isArray(job.applicants)) {
      console.log("job.applicants was undefined. Initializing as empty array.");
      job.applicants = [];
    }

    console.log("job.applicants:", job.applicants);
    console.log("userId:", userId);

    if (job.applicants.includes(userId)) {
      return res.status(400).json({ message: "Already applied" });
    }

    job.applicants.push(userId);
    await job.save();

    await sendEmail(
      job.postedBy.email,
      "New Job Application Received",
      `${user.name} has applied to your job "${job.title}".`
    );

    res.status(200).json({ message: "Application successful" });
  } catch (error) {
    console.error("Error in applyForJob:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res
        .status(403)
        .json({ message: "Only candidates can view applied jobs" });
    }

    const jobs = await Job.find({ applicants: req.user._id });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error in getAppliedJobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const searchJobs = async (req, res) => {
  try {
    const { keyword, location } = req.query;

    let query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" }; // Case-insensitive search
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error in searchJobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied: Not your job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.jobId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error: error.message });
  }
};


const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied: Not your job" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
};


module.exports = {
  postJob,
  getAllJobs,
  getMyJobs,
  applyForJob,
  getAppliedJobs,
  searchJobs,
  updateJob,
  deleteJob,
};
