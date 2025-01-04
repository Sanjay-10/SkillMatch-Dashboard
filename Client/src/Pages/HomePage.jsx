import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Background from "../components/Background";
import Home from "../assets/Home.png";
import Analyze from "../assets/Analyze.png";

const HomePage = () => {
  return (
    <div className="mx-auto  items-center gap-x-8 gap-y-12  max-w-7xl grid-cols-3 px-8">
      <Header />
      <Background />       

      <div className="mx-auto max-w-3xl py-16  ">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            SkillMatch Chrome Extension
            </h1>
            <p className="mt-8  text-pretty font-medium text-gray-600 text-xl/8">
            Your personalized analysis hub for resume and job description
          insights. Explore detailed skill alignment, tailored project
          recommendations, cover letter suggestions, and improvement tips to
          enhance your career prospects.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                 target="_blank"
        rel="noopener noreferrer"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Download Now <span className="pl-2" aria-hidden="true">&rarr;</span>
              </a>

            </div>
          </div>

          <div className=" flex justify-center  gap-x-8 gap-y-12 mt-16">
            <img
              className="h-96 border-2 border-gray-400"
              src={Home}
              alt="Home ScreenShot"
            />
            <img
              className="h-96 border-2 border-gray-400"
              src={Analyze}
              alt="Analyze ScreenShot"
            />

          </div>
        </div>

    </div>
  );
};

export default HomePage;
