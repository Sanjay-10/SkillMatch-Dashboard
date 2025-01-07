import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" text-black bg-blue-50 w-full mt-12 px-3 py-10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="">
            <div  className="text-2xl font-bold">
            SkillMatch
            </div>
            <p>© 2025</p>
            </div>
        <div className="text-sm space-y-1">
          <p>
            <Link to="/privacy-policy" className="hover:underline text-blue-800">
              Privacy Policy
            </Link>
          </p>
        <p>
            <a href="mailto:sanjaysays10@gmail.com" className="hover:underline text-blue-800">
                Email Us
            </a>
        </p>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
