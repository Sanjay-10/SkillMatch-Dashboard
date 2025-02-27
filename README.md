## **:red_circle: Note**
Start by setting up the SkillMatch Chrome Extension and Server (Project 1) to analyze job descriptions and extract key insights. Then, proceed to the SkillMatch Dashboard (Project 2) for detailed job analysis and automatic cover letter generation.

# SkillMatch Dashboard

This repository hosts the SkillMatch Dashboard, a tool for viewing detailed insights about job descriptions and generating personalized cover letters. It works in tandem with the SkillMatch Chrome Extension.

## SkillMatch Chrome Extension

You can download and install the SkillMatch Chrome Extension from the Chrome Web Store using the following link:

[SkillMatch Chrome Extension](https://chromewebstore.google.com/detail/skillmatch/nkibjapabhjcmcgihbkbmogggdaaofla)

## Features

- **Detailed Job Overview**: View all the extracted job details such as job title, skills, experience level, and more.
- **Cover Letter Generation**: Automatically generate a tailored cover letter based on the job description.

## Screenshots
**The homepage of the SkillMatch Dashboard**

<img src="Client/public/Screensorts/ss.png" alt="project 2- Dashboard - HomePage" width="700"/>

**The page where you can analyze job descriptions.**

<img src="Client/public/Screensorts/Analyze%20Page.png" alt="Analyze Page" width="700"/>

**The main interface of the SkillMatch Chrome Extension.**

<img src="Client/public/Screensorts/Home.png" alt="Extension Home" Height="400" Width="300"/>

**Insights provided after analyzing a job description.**

<img src="Client/public/Screensorts/Analyze.png" alt="Analyze" Height="400" Width="300"/>

**Extracted job details from the job description.**

<img src="Client/public/Screensorts/Analyze-2.png" alt="Analyze - Detailed View" Height="400" Width="300"/>

**Generate cover letters based on the analyzed job descriptions.**

<img src="Client/public/Screensorts/cover%20letter.png" alt="Cover Letter Generation" width="700"/>

**A detailed view of the analysis results.**

<img src="Client/public/Screensorts/Details.png" alt="Job Details" width="700"/>



## How It Works

### Extension

The SkillMatch Extension analyzes job descriptions and sends the data to this dashboard.

### Dashboard

The dashboard displays detailed insights about the job description and generates a cover letter using the analyzed data.

## Technologies Used
- **React**: For building the front-end UI of the dashboard.
- **Node.js / Express**: For the server-side logic that processes incoming data from the extension.
- **Google Gemini API**: For AI-powered analysis of job descriptions.
- **Tailwind CSS**: For styling the dashboard with utility-first CSS.

## Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/Sanjay-10/SkillMatch-Dashboard.git
    ```
2. **Set Up the Dashboard**:
    - Navigate to the skillmatch-dashboard folder:
      ```sh
      cd skillmatch-dashboard/Client
      ```
    - Install dependencies:
      ```sh
      npm install
      ```
    - Run the dashboard:
      ```sh
      npm run dev
      ```

## License

This project is for personal use only. Please do not use, distribute, or modify the code without explicit permission.