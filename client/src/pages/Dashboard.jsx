import { useEffect, useState } from "react";
import axios from "axios";
import {ResizablePanelGroup, ResizablePanel, ResizableHandle} from "@/components/ui/resizable";
import { Briefcase, Building, Clock, Link, MapPinMinus } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");

  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isSearching, setIsSearching] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL


useEffect(() => {
  const fetchJobs = async () => {
    try {
      const endpoint = isSearching 
        ? `${backendURL}/api/v1/jobs/filter?location=${searchLocation}&page=${currentPage}&limit=20`
        : `${backendURL}/api/v1/jobs/all?page=${currentPage}&limit=20`;

      const res = await axios.get(endpoint);
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
      setSelectedJob(res.data.jobs[0] || null);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  fetchJobs();
}, [currentPage, isSearching, searchLocation]);


// Handle location-based search
const handleSearch = async (e) => {
  e.preventDefault();
  setIsSearching(true);
  setCurrentPage(1); // Reset to page 1
};

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full">
      {/* Left Side */}
      <ResizablePanel defaultSize={40}>
        <div className="h-full border-r border-gray-200 flex flex-col font-[outfit]">
          <SearchBar  
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            handleSearch={handleSearch}
          />
          {/* Clear search */}
          {isSearching && (
            <button
              onClick={() => {
               setIsSearching(false);
               setSearchLocation("");
               setCurrentPage(1);
               }}
               className="text-sm text-blue-600 underline mt-2 ml-6"
            >
              Clear Search
            </button>
           )}

          {/* Job List */}
          <div className="overflow-y-auto flex-1">
            <h2 className="text-xl font-bold px-6 py-4 border-b bg-white">Jobs</h2>
            {jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => setSelectedJob(job)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  selectedJob?._id === job._id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex justify-between">
                 <div className="flex items-start gap-4">
                   <img
                    src={job.companyImageUrl}
                    alt="Company Logo"
                    className="w-12 h-12 object-contain rounded border"
                   />

                   <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-700">{job.company}</p>
                    <p className="text-sm text-gray-600">
                        {job.location?.includes(job.country)
                          ? job.location
                           : `${job.location}, ${job.country}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {job.employment_type} | {job.experience || `${job.min_exp}-${job.max_exp} Years`}
                    </p>
                    <p className="text-xs text-gray-500">
                       Source: {job.source} -{" "}
                       {new Date(job.postedDateTime?.$date || job.postedDateTime).toLocaleDateString()}
                    </p>
                   </div>
                 </div> 

                 <div>
                    <a
                       href={job.job_link}
                       target="_blank"
                       rel="noopener noreferrer"
                       onClick={(e) => e.stopPropagation()}
                       className="text-xs px-2 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Quick Apply
                    </a>
                 </div>
                </div>

              </div>
            ))}

          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </ResizablePanel>

      {/* Resizable Handle */}
      <ResizableHandle withHandle />

      {/* Right Side */}
      <ResizablePanel defaultSize={65} minSize={40} maxSize={60}>
        <div className="p-6 font-[outfit] overflow-y-auto h-full">
          {selectedJob ? (
            <div>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedJob.companyImageUrl}
                    alt="Company Logo"
                    className="w-10 h-10 my-4 object-contain rounded border"
                    />
                  <h2 className="text-3xl font-bold mb-2 font-[outfit]">{selectedJob.title}</h2>
                </div>

                <h2 className="flex items-center gap-2 text-gray-700 font-[outfit] font-light fonr-xl"><Building size={17}/>{selectedJob.company}</h2>
                <div className="flex justify-between items-center">
                  <p className="flex items-center gap-2 text-gray-700 font-[outfit] font-light fonr-xl">
                    <MapPinMinus size={20}/>{selectedJob.location}
                  </p>
                  <div>
                    <a
                       href={selectedJob.job_link}
                       target="_blank"
                       rel="noopener noreferrer"
                       onClick={(e) => e.stopPropagation()}
                       className="text-xs px-2 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Quick Apply
                    </a>
                  </div>
                </div>

              <div className="w-full border-1 my-8"></div>

              <div>
                <h1 className="font-[outfit] flex items-center gap-2 text-gray-700 font-medium text-xl">Job Details</h1>
                <p className="flex items-center gap-2 font-light mt-3 text-sm"><Briefcase size={17}/>{selectedJob.employment_type}</p>
              </div>

              <div>
                <p className="flex items-center gap-2 font-light mt-3 text-sm">
                  <Clock size={17} />
                  {new Date(selectedJob.postedDateTime).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <p className="flex items-center gap-2 font-light mt-3 text-sm">
                  <Link size={17} />
                  Source : {selectedJob.source}
                </p>
              </div>


              <div className="w-full border-1 my-8"></div>


              <div>
                <h1 className="font-[outfit] flex items-center gap-2 text-gray-700 font-medium text-xl">Full Job Description</h1>
                <p className="flex items-center gap-2 font-light mt-3 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus explicabo iure ratione sed, itaque natus unde a rem harum laboriosam repellendus, id voluptas tempore molestiae. Ratione, necessitatibus.</p>
              </div>

            </div>
          ) : (
            <p className="text-gray-500">Select a job to view details</p>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Dashboard