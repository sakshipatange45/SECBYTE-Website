const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    client: { type: String },
    industry: { type: String },
    description: { type: String, required: true },
    technologiesUsed: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);