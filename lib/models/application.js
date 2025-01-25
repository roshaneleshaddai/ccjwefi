import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobId: { type: String, required: true },
    userId: { type: String, required: true },
    employerId: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected"],
      default: "Applied",
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });


  const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);
  export default Application;