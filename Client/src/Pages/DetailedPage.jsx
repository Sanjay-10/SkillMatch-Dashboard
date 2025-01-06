import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import GreenBadge from "../components/GreenBadge";
import RedBadge from "../components/RedBadge";
import Header from "../components/Header";
import Background from "../components/Background";

function DetailedPage() {

  const [resume, setResume] = useState('');
  const [extensionData, setExtensionData] = useState({});
  const [jobDescription, setJobDescription] = useState('');
  const [detailedOverview, setDetailedOverview] = useState({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetDivRef = useRef(null);

  const scrollToDiv = () => {
    targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const uniqueId = new URLSearchParams(window.location.search).get('data');
    if (uniqueId) {
      window.postMessage(
        { type: 'FROM_REACT_APP', action: 'getData', uniqueId },
        '*'
      );
    }
  
    const messageHandler = (event) => {
      if (event.source !== window) return;
  
      if (event.data.type === 'FROM_CONTENT_SCRIPT') {
        const fetchedData = event.data.data;
        console.log("2nd if condition");
        console.log("Extension Data", fetchedData);
  
        const resumeText = fetchedData.resumeText
          ? fetchedData.resumeText.split('\n').join(' ')
          : '';
        const jobDesc = fetchedData.jobDescription
          ? fetchedData.jobDescription.split('\n').join(' ')
          : '';
  
        // Set states for resume and job description
        console.log("Resume (before state update):", resumeText);
        console.log("Job Description (before state update):", jobDesc);
  
        setResume(resumeText);
        setJobDescription(jobDesc);
        setExtensionData(fetchedData);
  
        // Save for debugging or persistence
        sessionStorage.setItem('extensionData', JSON.stringify(fetchedData));
      }
    };
  
    console.log("message handler useEffect");
    window.addEventListener('message', messageHandler);
  
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);
  
  // Trigger `fetchDetailedOverview` only when both `resume` and `jobDescription` are updated
  useEffect(() => {
    const fetchDetailedOverview = async () => {
      if (!resume || !jobDescription) {
        console.log("fetch detailed overview not run"); // Wait until both `resume` and `jobDescription` are populated
        return;
      }
  
      try {
        console.log("Before fetch: Resume =", resume);
        console.log("Before fetch: Job Description =", jobDescription);
  
        const response = await fetch(
          'https://skillmatch-server.vercel.app/gemini/detailedOverview',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resumeText: resume, jobDescription }),
          }
        );
        const data = await response.json();
        setDetailedOverview(data.detailedOverview);
      } catch (error) {
        console.error('Failed to fetch detailed overview:', error);
        setError('Failed to fetch detailed overview');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDetailedOverview();
  }, [resume, jobDescription]); // Dependency array ensures it runs when both are updated
  

  const resumeSkills = extensionData?.extensionResult?.resumeSkills || '';
  const jobDescriptionSkills = extensionData?.extensionResult?.jobDescriptionSkills || '';
  const missingSkills = extensionData?.extensionResult?.missingSkills || '';
  const percentageMatch = extensionData?.extensionResult?.percentageMatch || '';
  const areasOfImprovement = detailedOverview.areasOfImprovement || '';
  const recommendations = detailedOverview.recommendations || '';
  const projectEnhancement = detailedOverview.projectEnhancement || '';
  const resumeReview = detailedOverview.resumeReview || '';

  const resumeSkillsFormated = resumeSkills
  ? resumeSkills.split(",").map((skill) => skill.trim())
  : [];

const jobDescriptionSkillsFormated = Array.isArray(jobDescriptionSkills) && jobDescriptionSkills[0]
  ? jobDescriptionSkills[0].split(", ").map((skill) => skill.trim())
  : [];

  const features = [
    { name: "Resume Skills", description: resumeSkillsFormated || [] },
    { name: "Job Description Skills", description: jobDescriptionSkillsFormated || [] },
    { name: "Missing Skills", description: missingSkills || [] },
    { name: "Match Percentage", description: percentageMatch || "N/A" },
    { name: "Key Areas for Improvement", description: areasOfImprovement || "None" },
    { name: "Actionable Recommendations", description: recommendations || "No recommendations available" },
    { name: "Project Recommendations", description: projectEnhancement || "None" },
    { name: "Resume Insights", description: resumeReview || "No insights available" },
  ];
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium">Loading...</p>
      </div>
    );
  }
  
 

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-red-600">{"Try Again..."}</p>
      </div>
    );
  }
  return (
    <div className="bg-white">

      <Header />
      <Background />


      <div className="relative isolate  pt-14 px-8">
     
        {/* MAIN CONTENT */}
        <div className="mx-auto  items-center gap-x-8 gap-y-12  max-w-7xl grid-cols-3 px-8">
      <div className=" items-center  font-semibold ">
        <button onClick={scrollToDiv} className =  "bg-blue-600  border-2 border-dashed   text-white font-semibold px-4 py-2 rounded-md  hover:bg-blue-700  " >
        Generate Cover Letter
      </button>
        </div>
          <div className=" pt-4 mt-8  px-3">
            <dt className="font-medium text-xl text-black">Resume Insights</dt>
            <dd className="text-lg pt-3  text-gray-800 ">
              {resumeReview}
            </dd>
          </div>

          <div >
            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl"></h2>

            <div className="mt-6  px-3 pt-4 border-t border-gray-400">
             {/* <h1 className="text-blue-600 font font-medium text-xl bg pb-3">Overview</h1>  */}
              <div className="mt-1 grid  gap-x-2 gap-y-3 grid-cols-2  ">
                <div>
                  <h2 className="text-[17px] mt-3  font-semibold tracking-tight text-black ">
                    Company Name :{" "}
                  </h2>
                  <div className="text-gray-600 font-medium">
                    {extensionData?.extensionResult?.jobDetails?.company}{" "}
                  </div>
                </div>
                <div>
                  <h2 className="text-[17px] mt-3 font-semibold tracking-tight text-black  ">
                    Job Title :{" "}
                  </h2>
                  <div className="text-gray-600 font-medium">
                    {extensionData?.extensionResult?.jobDetails?.jobTitle}{" "}
                  </div>
                </div>
                <div>
                  <h2 className="text-[17px] mt-3 font-semibold tracking-tight text-black ">
                    Start Date :{" "}
                  </h2>
                  <div className="text-gray-600 font-medium">
                    {extensionData?.extensionResult?.jobDetails?.startDate}{" "}
                  </div>
                </div>
                <div>
                  <h2 className="text-[17px] mt-3 font-semibold tracking-tight text-black ">
                    Job Type :{" "}
                  </h2>
                  <div className="text-gray-600 font-medium">
                    {extensionData?.extensionResult?.jobDetails?.jobType}{" "}
                  </div>
                </div>
                <div>
                  <h2 className="text-[17px] mt-3 font-semibold tracking-tight text-black ">
                    Salary :{" "}
                  </h2>
                  <div className="text-gray-600 font-medium">
                    {extensionData?.extensionResult?.jobDetails?.salary}{" "}
                  </div>
                </div>
                <div>
                  <h2 className="text-[17px] mt-3 font-semibold tracking-tightc text-black ">
                    Experience :{" "}
                  </h2>
                  <div className="text-gray-600 font-medium">
                    {extensionData?.extensionResult?.jobDetails?.experience}{" "}
                  </div>
                </div>
                <div>
                  <h2 className="text-[17px] mt-3 font-semibold tracking-tight text-black ">
                    Location :{" "}
                  </h2>
                  <div className="text-gray-600 font-medium">
                    {extensionData?.extensionResult?.jobDetails?.location}{" "}
                  </div>
                </div>
              </div>

              <h2 className="text-[17px] mt-4 pt-2 font-semibold tracking-tight text-black ">
                Responsibilities :{" "}
              </h2>
              <div className="text-gray-600 font-medium">
                {extensionData?.extensionResult?.jobDetails?.responsibilities}{" "}
              </div>
            </div>

            <dl className="mt-16 ">
              {features
                .filter(
                  (feature) =>
                    feature.name !== "Match Percentage" &&
                    feature.name !== "Resume Insights" &&
                    feature.name !== "Job Description Skills"
                )
                .map((feature) => (
                  <div
                    key={feature.name}
                    className="border-t  border-gray-400 pt-4 px-3"
                  >
                    <dt className="font-medium text-xl  text-black">
                      {feature.name === "Missing Skills"
                        ? feature.name + " - " +  missingSkills.length
                        : feature.name}
                    </dt>
                    <dd className="mt-2 py-6 text-lg text-gray-800 ">
                      {feature.name === "Resume Skills" ? (
                        // Render Resume, JD, and Missing Skills as badges
                        feature.description.map((skill, index) => (
                          <GreenBadge key={index} title={skill} />
                        ))
                      ) : feature.name === "Missing Skills" ? (
                        feature.description.map((skill, index) => (
                          <RedBadge key={index} title={skill} />
                        ))
                      ) : (
                        // Render the rest as numbered lists
                        <ul className="list-disc pl-5">
                          {feature.description.map((item, index) => (
                            <li className="pb-5" key={index}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
          <div ref={targetDivRef} className="height">
          <div className="h-full bg-gray-100 p-4">
            <p className="text-gray-700">
              This is a full height text container. You can add any content here and it will take up the full height of its parent container.
            </p>
          </div>
        </div>
        </div>

        {/* MAIN CONTENT END */}
       
      </div>
    </div>
  );
}

export default DetailedPage;