import mongoose from 'mongoose';
import 'dotenv/config'; 
import fs from 'fs';
import jobmodel from './model/jobmodel.js';


const seedData = async () => {
  try {
    const dbURI = process.env.MONGO_URI;
    await mongoose.connect(dbURI);
    console.log("Database connected");

    const rawData = fs.readFileSync("./data/jobs.json", "utf-8");
    const jobs= JSON.parse(rawData);

    if (!Array.isArray(jobs)) throw new Error("jobs.json must be an array.");


    // first correct the jobId and postedDateTime and we map over each job of job.json 
    const cleanedJobs = jobs.map(job => {
      //handling jobId 
      const rawId = job["Job ID (Numeric)"];
      let jobId;

      if (typeof rawId === "string") jobId = Number(rawId);
      else if (typeof rawId === "object" && "$numberLong" in rawId) jobId = Number(rawId["$numberLong"]);

      if (!jobId || isNaN(jobId)) {
        jobId = Date.now() + index; //if no jobId then fallback is Date.now() + index
      }

      return {
        jobId,   
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        job_link: job.job_link || "",
        seniority_level: job.seniority_level || "Not specified",
        employment_type: job.employment_type || "Not specified",
        source: job.source || "Unknown",
        experience: job.experience || "Not specified",
        company_url: typeof job.company_url === "string" ? job.company_url : "",
        companyImageUrl: typeof job.companyImageUrl === "string" ? job.companyImageUrl : "",
        postedDateTime: job.postedDateTime?.["$date"] ? new Date(job.postedDateTime["$date"]) : new Date(),
        min_exp: typeof job.min_exp === "number" ? job.min_exp : 0,
        max_exp: typeof job.max_exp === "number" ? job.max_exp : 0,
        country: job.country || "India",
        companytype: job.companytype || "Not specified"
      };
    });

    // Deduplicate by jobId
    const seen = new Set();
    const uniqueJobs = cleanedJobs.filter(job => {
      if (seen.has(job.jobId)) return false;
      seen.add(job.jobId);
      return true;
    });

    //removing previous jobs in db
    await jobmodel.deleteMany({});
    console.log("Previous job data cleared");

    //Now i can insert the jobs.json data into database
    await jobmodel.insertMany(uniqueJobs,{ ordered: false });   //ordered: false so that mongodb can skip duplicate jobs
    console.log("Data inserted successfully");
    console.log(`Inserted ${uniqueJobs.length} jobs successfully`);   //to see how many jobs i have inserted in db

    process.exit();
  } 
  catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedData();
