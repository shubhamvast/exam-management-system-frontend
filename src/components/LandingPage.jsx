import React from "react";
import image from "../assets/image/emsBanner3.webp";

const LandingPage = () => {
  return (
    <div className="h-[calc(100vh-76px)]  bg-no-repeat bg-center flex flex-col justify-center items-center ">
      <div className="h-1/3 w-3/4  flex  justify-center items-center text-7xl font-serif ">
        <span className="mr-3 text-yellow-500">Exam </span> <span className="mr-3 text-yellow-500">Management</span> <span className="mr-3 text-slate-400">System </span>
      </div>
      <div className="h-1/3 w-3/4   flex  justify-end items-start text-4xl font-serif ">
          <p>Online Exam Made Easy....</p>
      </div>
    </div>
  );
};

export default LandingPage;
