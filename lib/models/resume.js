const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    template: { type: String, required: true }, // Template name or ID
    sections: {
      careerObjective: { type: String },
      education: [
        {
          institution: { type: String },
          degree: { type: String },
          fieldOfStudy: { type: String },
          startDate: { type: Date },
          endDate: { type: Date },
        },
      ],
      skills: [{ type: String }],
      workExperience: [
        {
          company: { type: String },
          position: { type: String },
          startDate: { type: Date },
          endDate: { type: Date },
          description: { type: String },
        },
      ],
      internships: [
        {
          company: { type: String },
          position: { type: String },
          startDate: { type: Date },
          endDate: { type: Date },
          description: { type: String },
        },
      ],
      projects: [
        {
          title: { type: String },
          description: { type: String },
          startDate: { type: Date },
          endDate: { type: Date },
        },
      ],
      awards: [{ type: String }],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Resume = mongoose.model("Resume", resumeSchema);