// import express from "express";    //we use "type": "module" instead of "common-js"
// import cors from "cors";          //for cross origin requests(frontend to backend)
// import 'dotenv/config';          
// import connectDB from "./config/connectDB.js";   
// import jobListingRouter from "./routes/jobRoutes.js";

// const app = express();

// const PORT = process.env.PORT || 4000;   //defining port

// //connecting db
// connectDB();

// //built in middlewares
// app.use(express.json());  
// app.use(cors());

// //handling routes
// app.use('/api/v1/jobs', jobListingRouter);

// //starting server
// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// })


// server.js or main.js (depending on your setup)

import 'dotenv/config';
import app from './app.js'; // adjust the path if needed


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
