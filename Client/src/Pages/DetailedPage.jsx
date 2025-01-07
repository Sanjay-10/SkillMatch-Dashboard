import React from "react";
import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import GreenBadge from "../components/GreenBadge";
import RedBadge from "../components/RedBadge";
import Header from "../components/Header";
import Background from "../components/Background";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import Footer from "../components/Footer";


function DetailedPage() {
  const [resume, setResume] = useState("");
  const [extensionData, setExtensionData] = useState({});
  const [jobDescription, setJobDescription] = useState("");
  const [detailedOverview, setDetailedOverview] = useState({});
  const [coverLoading, setCoverLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [copied, setCopied] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetDivRef = useRef(null);

  const scrollToDiv = () => {
    targetDivRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
    setCopied(true);
  };

  useEffect(() => {
    let interval; // Declare interval outside for access in multiple scopes
  
    // Check if there's already data stored in sessionStorage
    const storedData = sessionStorage.getItem("extensionData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setResume(parsedData.resumeText.replace(/\n/g, " "));
      setJobDescription(parsedData.jobDescription.replace(/\n/g, " "));
      setExtensionData(parsedData);
      // console.log("Loaded data from sessionStorage");
      return; // Skip polling if data is already present
    }
  
    // Function to handle incoming messages
    const messageHandler = (event) => {
      if (event.source !== window) return;
  
      if (event.data?.type === "FROM_CONTENT_SCRIPT") {
        const fetchedData = event.data.data;
        // console.log("Received data from content script:", fetchedData);
  
        const resumeText = fetchedData.resumeText?.replace(/\n/g, " ") || "";
        const jobDesc = fetchedData.jobDescription?.replace(/\n/g, " ") || "";
  
        setResume(resumeText);
        setJobDescription(jobDesc);
        setExtensionData(fetchedData);
  
        // Save for persistence
        sessionStorage.setItem("extensionData", JSON.stringify(fetchedData));
  
        // Stop polling once data is received
        if (interval) {
          clearInterval(interval);
          // console.log("Polling stopped as data has been received.");
        }
      }
    };
  
    // Attach the event listener
    window.addEventListener("message", messageHandler);
  
    // Start polling for data
    interval = setInterval(() => {
      const uniqueId = new URLSearchParams(window.location.search).get("data");
      if (uniqueId) {
        // console.log("Polling for data with uniqueId:", uniqueId);
        window.postMessage(
          { type: "FROM_REACT_APP", action: "getData", uniqueId },
          "*"
        );
      }
    }, 1000); // Poll every second
  
    // Cleanup on unmount
    return () => {
      if (interval) {
        clearInterval(interval); // Clear the polling interval
      }
      window.removeEventListener("message", messageHandler); // Remove the event listener
    };
  }, []); // Dependency array ensures this runs only once
  
  // Trigger `fetchDetailedOverview` only when both `resume` and `jobDescription` are updated
  useEffect(() => {
    const fetchDetailedOverview = async () => {
      if (!resume || !jobDescription) {
        return;
      }

      try {

        const response = await fetch(
          "https://skillmatch-server.vercel.app/gemini/detailedOverview",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resumeText: resume, jobDescription }),
          }
        );
        const data = await response.json();
        setDetailedOverview(data.detailedOverview);
      } catch (error) {
        console.error("Failed to fetch detailed overview:", error);
        setError("Failed to fetch detailed overview");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedOverview();
  }, [resume, jobDescription]); 

  const fetchCoverLetter = async () => {
    try {
      setCoverLoading(true);
      const response = await fetch(
        "https://skillmatch-server.vercel.app/gemini/coverLetter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeText: resume, jobDescription }),
        }
      );
      const data = await response.text();
      const parsedData = JSON.parse(data);
      setCoverLetter(parsedData.coverLetter);
      // console.log("Cover Letter:", data);
    } catch (error) {
      console.error("Failed to fetch detailed overview:", error);
      setError("Failed to fetch detailed overview");
    } finally {
      setCoverLoading(false);
    }
  };

  const resumeSkills = extensionData?.extensionResult?.resumeSkills || "";
  const jobDescriptionSkills =
    extensionData?.extensionResult?.jobDescriptionSkills || "";
  const missingSkills = extensionData?.extensionResult?.missingSkills || "";
  const percentageMatch = extensionData?.extensionResult?.percentageMatch || "";
  const areasOfImprovement = detailedOverview.areasOfImprovement || "";
  const recommendations = detailedOverview.recommendations || "";
  const projectEnhancement = detailedOverview.projectEnhancement || "";
  const resumeReview = detailedOverview.resumeReview || "";

  const resumeSkillsFormated = resumeSkills
    ? resumeSkills.split(",").map((skill) => skill.trim())
    : [];

  const jobDescriptionSkillsFormated =
    Array.isArray(jobDescriptionSkills) && jobDescriptionSkills[0]
      ? jobDescriptionSkills[0].split(", ").map((skill) => skill.trim())
      : [];

  const features = [
    { name: "Resume Skills", description: resumeSkillsFormated || [] },
    {
      name: "Job Description Skills",
      description: jobDescriptionSkillsFormated || [],
    },
    { name: "Missing Skills", description: missingSkills || [] },
    { name: "Match Percentage", description: percentageMatch || "N/A" },
    {
      name: "Key Areas for Improvement",
      description: areasOfImprovement || "None",
    },
    {
      name: "Actionable Recommendations",
      description: recommendations || "No recommendations available",
    },
    {
      name: "Project Recommendations",
      description: projectEnhancement || "None",
    },
    {
      name: "Resume Insights",
      description: resumeReview || "No insights available",
    },
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
          <div className=" items-center  font-medium ">
            <button
              onClick={() => {
                fetchCoverLetter();
                scrollToDiv();
              }}
              className="bg-blue-600  text-white text-sm font-semibold px-4 py-2 rounded-md  hover:bg-blue-700  "
            >
              Generate Cover Letter
            </button>
          </div>

          <div className=" pt-4 mt-8  px-3">
            <dt className="font-semibold text-2xl text-black">
              Resume Insights
            </dt>
            <dd className="text-lg pt-3  text-gray-800 ">{resumeReview}</dd>
          </div>

          <div>
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
                    <dt className=" text-2xl font-semibold  text-black">
                      {feature.name === "Missing Skills"
                        ? feature.name + " - " + missingSkills.length
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

          {/* COVER LETTER */}
          <div ref={targetDivRef} className=" mt-8 pb-40 relative">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
                Cover Letter
              </h2>

              <div className="absolute top-1 right-4">
                {coverLetter && (
                  <Button
                    size="lg"
                    onMouseLeave={() => setCopied(false)}
                    onClick={() => {
                      copyToClipboard();
                    }}
                    className="flex items-center gap-2 py-2 px-5 rounded-md bg-black hover:bg-black"
                  >
                    {copied ? (
                      <>
                        <CheckIcon className="h-4 w-4  text-white" />
                        Copied
                      </>
                    ) : (
                      <>
                        <DocumentDuplicateIcon className="h-4 w-4  text-white" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="mt-4 p-4 border bg-blue-50 border-blue-300  rounded-md">
                {coverLoading ? (
                  <p className="text-lg font-semibold  text-blue-600">
                    Loading...
                  </p>
                ) : (
                  <div className="text-[15px] font-medium text-gray-800 whitespace-pre-line">
                    {coverLetter || (
                      <div className=" items-center  font-medium ">
                        <button
                          onClick={() => {
                            fetchCoverLetter();
                          }}
                          className="bg-blue-600  text-white text-sm font-semibold px-4 py-2 rounded-md  hover:bg-blue-700  "
                        >
                          Generate Cover Letter
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {coverLetter && (
              <p className="font-normal py-4 text-center">SkillMatch uses AI. Check for mistakes.</p>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT END */}
      </div>
      <Footer />
    </div>
  );
}

export default DetailedPage;
