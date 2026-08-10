const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    career: { type: mongoose.Schema.Types.ObjectId, ref: "Career", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    resumeUrl: { type: String, required: true },
    coverLetter: { type: String },
    status: {
      type: String,
      enum: ["Applied", "Under Review", "Shortlisted", "Rejected", "Hired"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);