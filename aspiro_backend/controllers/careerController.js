
const recommendCareer = (req, res) => {
  const { skills = [], interests = [], experience = 0, education = "" } = req.body;

  if (!skills.length || !interests.length || !education) {
    return res.status(400).json({ message: "Please provide skills, interests, and education." });
  }

  const recommendations = [];

  if (skills.includes("react") && skills.includes("nodejs")) {
    recommendations.push({ title: "Full Stack Web Developer", matchScore: 95 });
  }

  if (skills.includes("html") && skills.includes("css") && interests.includes("design")) {
    recommendations.push({ title: "UI/UX Designer", matchScore: 80 });
  }

  if (skills.includes("python") && interests.includes("data")) {
    recommendations.push({ title: "Data Analyst", matchScore: 85 });
  }

  if (skills.includes("python") && skills.includes("machine learning")) {
    recommendations.push({ title: "AI Engineer", matchScore: 90 });
  }

  if (recommendations.length === 0) {
    recommendations.push({ title: "Software Developer", matchScore: 70 });
  }

  res.status(200).json({ recommendedCareers: recommendations });
};



const getTrendingCareers = (req, res) => {
  const trendingCareers = [
    {
      title: "AI/ML Engineer",
      description: "Works on artificial intelligence models and machine learning algorithms.",
      avgSalary: "$120k",
    },
    {
      title: "Full Stack Developer",
      description: "Handles both frontend and backend of web applications.",
      avgSalary: "$100k",
    },
    {
      title: "Cloud Engineer",
      description: "Manages cloud infrastructure like AWS, Azure, or GCP.",
      avgSalary: "$110k",
    },
    {
      title: "DevOps Engineer",
      description: "Automates development and deployment pipelines.",
      avgSalary: "$105k",
    },
    {
      title: "Cybersecurity Analyst",
      description: "Protects systems from cyber threats.",
      avgSalary: "$95k",
    }
  ];

  res.status(200).json({ trendingCareers });
};

// controllers/careerController.js

const getCareerTips = (req, res) => {
  const tips = [
    "Keep learning new technologies every 3–6 months.",
    "Contribute to open-source or personal projects.",
    "Follow industry leaders on Twitter/LinkedIn.",
    "Focus on building projects, not just watching tutorials.",
    "Write blogs or document your learning journey.",
    "Prepare for DSA & system design if aiming for big tech.",
    "Create a strong portfolio and resume.",
    "Practice mock interviews regularly.",
    "Get involved in tech communities or events.",
    "Focus on communication skills and teamwork."
  ];

  res.status(200).json({ tips });
};

module.exports = {
  recommendCareer,
  getTrendingCareers,
  getCareerTips
};
