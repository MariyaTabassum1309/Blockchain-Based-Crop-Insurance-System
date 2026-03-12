const express = require("express");
const router = express.Router();
const Claim = require("../models/Claim");
const Policy = require("../models/Policy");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// ===== MULTER STORAGE =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { policyId, userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const policy = await Policy.findById(policyId);

    // ===== POLICY CHECK =====
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    if (policy.status !== "Active") {
      return res.status(400).json({ message: "Policy not active" });
    }

    // ===== EXPIRY CHECK =====
    if (policy.endDate && new Date() > new Date(policy.endDate)) {
      return res.status(400).json({
        message: "Policy expired. Claim not allowed.",
      });
    }

    const imagePath = req.file.path;

    // ===== CALL AI SERVER =====
    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath));

    const aiResponse = await axios.post(
      "http://127.0.0.1:5001/predict",
      formData,
      { headers: formData.getHeaders() }
    );

    const { prediction, confidence } = aiResponse.data;

    const [predictedCrop, predictedStatus] = prediction.split("_");

    const confidencePercent = confidence * 100;

    // ===== CROP MISMATCH CHECK =====
    if (
      confidencePercent > 70 &&
      predictedCrop?.trim().toLowerCase() !==
        policy.cropType?.trim().toLowerCase()
    ) {
      return res.status(400).json({
        message: "Uploaded image does not match registered crop type",
      });
    }

    // ===== HEALTHY REJECT =====
    if (predictedStatus === "Healthy") {
      return res.status(400).json({
        message: "Crop is healthy. Claim rejected.",
      });
    }

    const newClaim = new Claim({
      policyId,
      userId,
      imageUrl: imagePath,
      predictedDisease: prediction,
      confidence: confidencePercent,
      status: "Pending",
    });

    await newClaim.save();

    res.json({
      message: "Claim sent for admin approval",
      prediction,
      confidence: confidencePercent,
      status: "Pending",
    });

  } catch (error) {
    console.error("CLAIM ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/user/:userId", async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.params.userId })
      .populate("policyId")
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;