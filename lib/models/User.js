import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId:{type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["job_seeker", "employer"], required: true },
  contact: { type: String },
  location: { type: String },
  skills: [{ type: String }],
  education: [
    {
      institution: { type: String },
      degree: { type: String },
      fieldOfStudy: { type: String },
      year:{type: String},
    },
  ],
  workExperience: [
    {
      company: { type: String },
      position: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  certifications: [{ type: String }],
  portfolioLinks: {
    github: { type: String },
    linkedin: { type: String },
    website: { type: String },
  },
  profile_photo: {type:String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the model or create it if it doesn't already exist
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
