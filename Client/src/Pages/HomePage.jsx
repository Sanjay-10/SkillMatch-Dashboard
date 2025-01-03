import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="bg-bgi-gray bg-cover bg-center h-dvh  " style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>SkillMatch Chrome Extension</h1>
        <p>Download our extension to get the most out of your job search experience!</p>
        <a
          href="https://chrome.google.com/webstore" // Add your extension's link here
          target="_blank"
          rel="noopener noreferrer"
        >
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Download Extension
          </button>
          <p className="mt-2 text-gray-600 font-medium text-lg">
          Your personalized analysis hub for resume and job description insights. Explore detailed skill alignment, tailored project recommendations, cover letter suggestions, and improvement tips to enhance your career prospects.
          </p>

          <Link to="/overview">
            <button style={{ padding: "10px 20px", fontSize: "16px" }}>
              overview
            </button>
            </Link>

            <div className="flex flex-1 items-center justify-end p-1.5 font-semibold">
                        <Link to="/contact">
                          Contact Us <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
        </a>
      </div>
      
    );
};

export default HomePage;