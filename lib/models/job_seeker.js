const jobSeekerProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resumeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }], // Resumes created by the user
    preferredJobTypes: [{ type: String }], // e.g., full-time, part-time, internship
    preferredLocations: [{ type: String }],
    preferredIndustries: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const JobSeekerProfile = mongoose.model("JobSeekerProfile", jobSeekerProfileSchema);