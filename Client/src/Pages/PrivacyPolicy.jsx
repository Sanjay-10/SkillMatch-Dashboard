import React from "react";
import Header from "../components/Header";
import Background from "../components/Background";
import Footer from "../components/Footer";

function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <Header />
      <Background />

      <div className="relative isolate  px-8 ">
        <div className="mx-auto max-w-7xl px-8">
          <div className="py-10">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              SkillMatch Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Effective Date: January 7, 2025
            </p>

            <div className="mt-8 space-y-8">
              <section>
                <p className="text-gray-700">
                  SkillMatch (the “Extension”) is committed to maintaining robust
                  privacy protections for its users. Our Privacy Policy (“Privacy
                  Policy”) is designed to help you understand how we collect, use,
                  and safeguard the information you provide to us and to assist
                  you in making informed decisions when using our services.
                </p>

                <p className="mt-4 text-gray-700">
                For purposes of this agreement, “Extension” refers to the browser 
                extension available on the Chrome Web Store. SkillMatch allows users 
                to upload and analyze their resumes against job descriptions, providing 
                tailored insights and recommendations.
                </p>

                <p className="mt-4 text-gray-700">
                  The terms “we,” “us,” and “our” refer to SkillMatch. The term
                  “you” refers to you, as a user of our Extension or related
                  services.
                </p>

                <p className="mt-4 text-gray-700">
                  By using our Extension, you accept our Privacy Policy and
                  Terms of Service and consent to our collection, storage, use,
                  and disclosure of your data as described in this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black">
                  1. Information We Collect
                </h2>
                <p className="mt-2 text-gray-700">
                  Our extension collects the following data:
                </p>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Your resume, which is stored locally on your device.</li>
                  <li>Job descriptions from the webpage for analysis purposes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black">
                  2. How We Use Your Information
                </h2>
                <p className="mt-2 text-gray-700">
                  The data is used to:
                </p>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Provide an analysis of your resume and job descriptions.</li>
                  <li>Generate insights and recommendations.</li>
                  <li>Create a tailored cover letter.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black">
                  3. Data Storage and Deletion
                </h2>
                <p className="mt-2 text-gray-700">
                  Your data is stored temporarily:
                </p>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>
                    On your local device through the extension for as long as you
                    keep the extension installed.
                  </li>
                  <li>
                    On our server for processing during a session, and it is
                    deleted after processing is complete.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black">
                  4. Data Sharing
                </h2>
                <p className="mt-2 text-gray-700">
                  SkillMatch uses a third-party service, Gemini (https://gemini.google.com/app), for analyzing
                  data. While we rely on Gemini for processing, we do not share
                  your data with any other third parties. Please note that Gemini
                  has its own privacy practices, which we encourage you to review.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black">
                  5. Your Rights
                </h2>
                <p className="mt-2 text-gray-700">
                  You can delete your data by removing the extension from your
                  browser.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-black">
                  6. Contact Us
                </h2>
                <p className="mt-2 text-gray-700">
                  For questions or concerns about this privacy policy, please
                  contact us at:
                </p>
                <p className="text-gray-700 font-medium">sanjaysays10@gmail.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
