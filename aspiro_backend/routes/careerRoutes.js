const express = require("express");
const router = express.Router();
const { recommendCareer, getTrendingCareers, getCareerTips } = require("../controllers/careerController");


router.post("/recommend", recommendCareer);
router.get("/trending", getTrendingCareers);
router.get("/tips", getCareerTips);

module.exports = router;