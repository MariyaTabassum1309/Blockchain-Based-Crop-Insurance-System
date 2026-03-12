const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    imageUrl: {
      type: String,
    },

    predictedDisease: {
      type: String,
    },

    confidence: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["Pending", "AI Eligible", "Approved", "Rejected"],
      default: "Pending",
    },

    adminApproved: {
      type: Boolean,
      default: false,
    },

    payoutTxHash: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);