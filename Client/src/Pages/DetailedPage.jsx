import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";

 function DetailedPage() {
 
  const [searchParams] = useSearchParams();
  const data = JSON.parse(searchParams.get("data") || "{}");

  const [details, setDetails] = useState("")
  const [pageLoading , setPageLoading] = useState(false)

  useEffect(() => {
    const { data } = queryString.parse(window.location.search); // Extract 'data' query parameter
    if (data) {
      const parsedData = JSON.parse(decodeURIComponent(data));
      setDetails(parsedData); // Set details state with parsed data
    }
  }, []);
  
  // const fetchCoverLetter = async () => {
  //   try {
  //     setPageLoading(true)
  //     const response = await fetch('http://localhost:5000/gemini/coverLetter', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ 
  //         resumeText: resumeText, 
  //         jobDescription: websiteContent 
  //       }),
  //     });
  //     const data = await response.json()
  //     setDetails(data)
  //   } catch (error) {
  //     console.error("Failed to fetch details:", error)
  //   } finally {
  //     setPageLoading(false)
  //   }
  // }

  const features = [
    { name: 'Resume Skills', description: '' },
    { name: 'Job Description Skills', description: '' },
    { name: 'Missing Skills', description: '' },
    { name: 'Match Percentage', description: '' },
    { name: 'Key Areas for Improvement', description: ' ' },
    { name: 'Actionable Recommendations ', description: '' },
    { name: 'Project Recommendations', description: '' },
    { name: 'Resume Insights', description: '' },
    
  ]

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50 ">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-12">
          <div className="flex lg:flex-1">
            <h5 className="SkillMatch text-[#007bff] font-semibold -m-1.5 p-1.5 text-2xl">
              SkillMatch
            </h5>
          </div>
          <div className="flex flex-1 items-center justify-end p-1.5 font-medium">
            <Link to="/contact-us">
              Contact Us  <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <div>
      <h1>Detailed Overview</h1>
      <div>
        <h2>Job Description</h2>
        <p>{data.jobDescription}</p>
      </div>
      <div>
        <h2>Resume</h2>
        <p>{data.resumeText}</p>
      </div>
      <div>
        <h2>Extension Result</h2>
        <pre>{JSON.stringify(data.extensionResult, null, 2)}</pre>
      </div>
      <div>
        <h2>Detailed Overview</h2>
        <pre>{JSON.stringify(data.detailedOverview, null, 2)}</pre>
      </div>
    </div>


      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1e3b9a] to-[#268bfd] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

{/* MAIN CONTENT */}


      <div className="mx-auto   items-center gap-x-8 gap-y-16  py-16 max-w-7xl grid-cols-2 px-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black sm:text-4xl">SkillMatch Dashboard</h2>
          <p className="mt-4 text-gray-600 font-medium text-lg">
          Your personalized analysis hub for resume and job description insights. Explore detailed skill alignment, tailored project recommendations, cover letter suggestions, and improvement tips to enhance your career prospects.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">

            {features.map((feature) => (
              <div key={feature.name} className="border-t  border-gray-400 pt-4">
                <dt className="font-medium text-xl text-black">{feature.name}</dt>
                <dd className="mt-2 text-lg text-Balck-500">{feature.description}</dd>
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
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#4fc8f8] to-[#1a27db] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}


export default DetailedPage