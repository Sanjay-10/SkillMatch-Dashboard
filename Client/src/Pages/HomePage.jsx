import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Background from "../components/Background";
import Home from "../assets/Home.png";
import Analyze from "../assets/Analyze.png";
import Analyze2 from "../assets/Analyze-2.png";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Background Component */}
      <Background />

      {/* Main Content */}
      <div className="flex-grow lg:mx-60 pt-14 px-4 py-8 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-7xl">
              SkillMatch Chrome Extension
            </h1>
            <p className="mt-6 text-lg font-medium text-gray-600 sm:text-xl md:text-2xl">
              Your personalized analysis hub for resume and job description insights. Explore detailed{" "}
              <span className="bg-green-100">Skill alignment</span>, tailored{" "}
              <span className="bg-yellow-100">Project recommendations</span>,{" "}
              <span className="bg-purple-100">Cover letter</span> suggestions, and{" "}
              <span className="bg-red-100">Improvement tips</span> to enhance your career prospects. 🚀📈💼
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6 flex-wrap">
              <a
                href="https://chromewebstore.google.com/detail/skillmatch/nkibjapabhjcmcgihbkbmogggdaaofla"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Download Now <span className="pl-2" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Screenshots Section */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex justify-center ">
              <img
                className="sm:w-full h-auto max-h-96 border-2 border-gray-400 shadow-2xl shadow-gray-500 hover:shadow-[#70a1d6] transition-shadow duration-300"
                src={Home}
                alt="Home ScreenShot"
              />
            </div>
            <div className="flex justify-center">
              <img
                className="sm:w-full h-auto max-h-96 border-2 border-gray-400 shadow-2xl shadow-gray-500 hover:shadow-[#70a1d6] transition-shadow duration-300"
                src={Analyze}
                alt="Analyze ScreenShot"
              />
            </div>
            <div className="flex justify-center">
              <img
                className="sm:w-full h-auto max-h-96 border-2 border-gray-400 shadow-2xl shadow-gray-500 hover:shadow-[#70a1d6] transition-shadow duration-300"
                src={Analyze2}
                alt="Analyze ScreenShot"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default HomePage;