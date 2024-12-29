import React from 'react';

const HomePage = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
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
        </a>
      </div>
      
    );
};

export default HomePage;