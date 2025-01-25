const employerProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    companyDescription: { type: String },
    industry: { type: String },
    website: { type: String },
    contactEmail: { type: String },
    logo: { type: String }, // URL to the company logo
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const EmployerProfile = mongoose.model("EmployerProfile", employerProfileSchema);