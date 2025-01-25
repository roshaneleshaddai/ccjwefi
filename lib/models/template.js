const templateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    previewImage: { type: String }, // URL to the template preview image
    htmlContent: { type: String, required: true }, // HTML/CSS for the template
    isPremium: { type: Boolean, default: false }, // Free or premium template
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Template = mongoose.model("Template", templateSchema);