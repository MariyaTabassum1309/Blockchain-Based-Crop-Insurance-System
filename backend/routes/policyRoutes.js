const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Policy = require("../models/Policy");
const User = require("../models/User");
const { sendEmail } = require("../utils/email");
const multer = require("multer");
const path = require("path");
const Claim = require("../models/Claim");
// ================= MULTER CONFIG =================
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

// ================= CREATE POLICY =================
router.post("/", upload.single("landDocument"), async (req, res) => {
  try {
    const {
      userId,
      coverage,
      riskType,
      premiumAmount,
      duration,
      cropType,
      acres,
      surveyNumber,
      village,
      district,
      state,
      txHash,
    } = req.body;

    if (
      !userId ||
      !coverage ||
      !riskType ||
      !premiumAmount ||
      !cropType ||
      !acres ||
      !surveyNumber ||
      !village ||
      !district ||
      !state ||
      !req.file
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ===== MAX 3 POLICIES PER YEAR =====
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);

    const policyCount = await Policy.countDocuments({
      userId,
      createdAt: { $gte: startOfYear },
    });

    if (policyCount >= 3) {
      return res.status(400).json({
        message: "You can create maximum 3 policies per year",
      });
    }

    const newPolicy = new Policy({
      userId: new mongoose.Types.ObjectId(userId),
      coverage: Number(coverage),
      riskType,
      premiumAmount: Number(premiumAmount),
      duration: 180,
      status: "Pending", // Admin must approve
      cropType,
      acres: Number(acres),

      surveyNumber,
      village,
      district,
      state,
      landDocument: req.file.path, // ✅ file stored here

      txHash: txHash || null,
      createdAt: new Date(),
    });

    const savedPolicy = await newPolicy.save();

    const user = await User.findById(userId);

    if (user && user.email) {
      await sendEmail(
        user.email,
        "📋 Policy Submitted for Approval",
        `<h2>Policy Submitted</h2>
         <p>Dear ${user.name},</p>
         <ul>
           <li><strong>Policy ID:</strong> ${savedPolicy._id}</li>
           <li><strong>Crop:</strong> ${savedPolicy.cropType}</li>
           <li><strong>Coverage:</strong> ₹${savedPolicy.coverage}</li>
           <li><strong>Status:</strong> Pending Admin Approval</li>
         </ul>`
      );
    }

    res.status(201).json(savedPolicy);

  } catch (error) {
    console.error("CREATE POLICY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ================= GET ALL POLICIES =================
router.get("/", async (req, res) => {
  try {
    const policies = await Policy.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= GET POLICIES BY USER =================
 // add at top if not present

// ================= GET POLICIES BY USER =================
router.get("/by-user/:userId", async (req, res) => {
  try {
    const policies = await Policy.find({
      userId: req.params.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    const claims = await Claim.find({
      userId: req.params.userId,
    });

    const result = policies.map((policy) => {
      const relatedClaim = claims.find(
        (c) => c.policyId.toString() === policy._id.toString()
      );

      return {
        ...policy,
        claimStatus: relatedClaim ? relatedClaim.status : null,
      };
    });

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;