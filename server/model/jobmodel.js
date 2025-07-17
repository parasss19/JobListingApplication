import mongoose from 'mongoose';

// Define mongoose schemas for Users
const jobSchema = new mongoose.Schema({
  jobId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  job_link: {
    type: String,
    required: true
  },
  seniority_level: {
    type: String,
    default: 'Not specified'
  },
  employment_type: {
    type: String,
    default: 'Not specified'
  },
  source: {
    type: String,
    default: 'Unknown',
    required: true
  },
  experience: {
    type: String,
    default: 'Not specified'
  },
  company_url: {
    type: String,
    default: ''
  },
  companyImageUrl: {
    type: String,
    default: ''
  },
  postedDateTime: {
    type: Date,
    default: Date.now
  },
  min_exp: {
    type: Number,
    default: 0
  },
  max_exp: {
    type: Number,
    default: 0
  },
  country: {
    type: String,
    default: 'India'
  },
  companytype: {
    type: String,
    default: 'Not specified'
  }
},
   {timestamps: true},
);


// Create a model from the schema
const jobModel = mongoose.model('Job', jobSchema);  

export default jobModel;