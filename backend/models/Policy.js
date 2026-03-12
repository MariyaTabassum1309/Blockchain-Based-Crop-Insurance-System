const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  coverage: { type: Number, required: true },
  riskType: { type: String, required: true },
  premiumAmount: { type: Number, required: true },
  duration: { type: Number, default: 180 },

  cropType: { type: String, required: true },
  acres: { type: Number, required: true },

  // ✅ NEW FIELDS
  surveyNumber: { type: String, required: true },
  village: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  landDocument: { type: String, required: true },

  // 🔥 IMPORTANT CHANGE
  status: { 
    type: String, 
    enum: ["Pending", "Active", "Rejected", "Claimed"],
    default: "Pending"
  },

  startDate: { type: Date },
  endDate: { type: Date },

  txHash: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Policy", policySchema);