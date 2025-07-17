import { Router } from "express";
import { fetchAllJobs, filterJobByLocation } from "../controllers/jobController.js";

const jobListingRouter = Router();

//Fetch all job data.
jobListingRouter.get('/all', fetchAllJobs);

//Filter jobs based on the provided location in the search query.
jobListingRouter.get('/filter', filterJobByLocation);

export default jobListingRouter;