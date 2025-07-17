import jobModel from "../model/jobmodel.js";

export const fetchAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await jobModel.countDocuments();
    const jobs = await jobModel.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      count: jobs.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const filterJobByLocation = async (req, res) => {
    try {
        const { location } = req.query;
        if (!location) {
          return res.status(400).json({ 
            success: false, 
            message: "Location is required" 
          });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = location ? { location: { $regex: location, $options: "i" } } : {};
        const total = await jobModel.countDocuments(filter);

        const jobs = await jobModel.find({
            location: { $regex: new RegExp(location, "i") } //i represent case-insensitive
        });
        
        res.status(200).json({
          success: true,
          jobs,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        });
    } 
    catch (error) {
        res.json({success: false, message: error.message});
    }
}