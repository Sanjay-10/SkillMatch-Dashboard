import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setResume,
  setResult,
  setJobDescription,
  setExtensionData,
  setDetailedOverview,
} from "../skillMatchSlice";
import GreenBadge from "../components/GreenBadge";
import RedBadge from "../components/RedBadge";

function DetailedPage() {
  const { resume, jobDescription, extensionData, detailedOverview } =
    useSelector((state) => state.skillMatch);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const uniqueId = new URLSearchParams(window.location.search).get('data');
    if (uniqueId) {
      window.postMessage(
        { type: 'FROM_REACT_APP', action: 'getData', uniqueId },
        '*'
      );
    }

    const messageHandler = (event) => {
      console.log("running")
      if (event.source !== window) {
      console.log("1st if condition activated")
      return;
      }
      if (event.data.type === 'FROM_CONTENT_SCRIPT') {
        const fetchedData = event.data.data;
        console.log("2nd if condition");
        dispatch(setExtensionData(fetchedData));
        dispatch(setResume(fetchedData.resumeText.split('\n').join('  ')));
        dispatch(setJobDescription(fetchedData.jobDescription.split('\n').join('  ')));
        sessionStorage.setItem('extensionData', JSON.stringify(fetchedData), false);
        setLoading(false); // End loading after data is processed
      }
    };

    const fetchDetailedOverview = async () => {
      console.log("fetching detailed overview");
      try {
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
        dispatch(setDetailedOverview(data.detailedOverview));
        console.log(detailedOverview);
      } catch (error) {
        setError('Failed to fetch detailed overview', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedOverview();

    window.addEventListener('message', messageHandler);
    console.log("Event Listener added");

    return () => {
      window.removeEventListener('message', messageHandler);
    };  
  }, [loading]);

  const resumeSkills = extensionData?.extensionResult?.resumeSkills || '';
  const jobDescriptionSkills = extensionData?.extensionResult?.jobDescriptionSkills || '';
  const missingSkills = extensionData?.extensionResult?.missingSkills || '';
  const percentageMatch = extensionData?.extensionResult?.percentageMatch || '';
  const areasOfImprovement = detailedOverview.areasOfImprovement || '';
  const recommendations = detailedOverview.recommendations || '';
  const projectEnhancement = detailedOverview.projectEnhancement || '';
  const resumeReview = detailedOverview.resumeReview || '';

  const resumeSkillsFormated = resumeSkills
    .split(",")
    .map((skill) => skill.trim());

    // console.log(resumeSkillsFormated);

  const jobDescriptionSkillsFormated = jobDescriptionSkills[0]
    .split(", ")
    .map((skill) => skill.trim());

  const features = [
    { name: "Resume Skills", description: resumeSkillsFormated },
    {
      name: "Job Description Skills",
      description: jobDescriptionSkillsFormated,
    },
    { name: "Missing Skills", description: missingSkills },
    { name: "Match Percentage", description: percentageMatch },
    { name: "Key Areas for Improvement", description: areasOfImprovement },
    { name: "Actionable Recommendations ", description: recommendations },
    { name: "Project Recommendations", description: projectEnhancement },
    { name: "Resume Insights", description: resumeReview },
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
      <header className="absolute max-w-7xl mx-auto px-8 inset-x-0 top-0 z-50  ">
        <nav
          aria-label="Global"
          className="flex items-center justify-between  mt-5 " 
        >
          <div className="flex lg:flex-1 ">
            <h5 className="SkillMatch text-[#007bff] font-semibold -m-1.5 p-1.5 text-3xl">
              SkillMatch
            </h5>
          </div>
          <div className="flex flex-1 items-center justify-end p-1.5 font-semibold">
            <Link to="/contact">
              Contact Us <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate  pt-14 px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1e3b9a] to-[#268bfd] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* MAIN CONTENT */}

        <div className="mx-auto  items-center gap-x-8 gap-y-12  max-w-7xl grid-cols-3 px-8">
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
          {/* <div className="height">
          <div className="h-full bg-gray-100 p-4">
            <p className="text-gray-700">
              This is a full height text container. You can add any content here and it will take up the full height of its parent container.
            </p>
          </div>
        </div> */}
        </div>

        {/* MAIN CONTENT END */}

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#4fc8f8] to-[#1a27db] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>        
      </div>
    </div>
  );
}

export default DetailedPage;