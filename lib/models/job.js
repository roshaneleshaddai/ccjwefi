const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  companyName: { type: String, required: true },
  employerId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String },
  industry: { type: String, required: true },
  skillsRequired: [{ type: String }],
  experienceRequired: { type: String },
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
  },
  applicationDeadline: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
