import mongoose from 'mongoose';

const CompanyProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    industry: { type: String },
    targetAudience: { type: String },
    location: { type: String },
    communicationTone: { type: String },
    website: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    linkedin: { type: String },
    services: { type: String },
  }, { timestamps: true });

export default mongoose.model('CompanyProfile', CompanyProfileSchema);
