import React from "react";
import image from "../assets/image/emsBanner3.webp";

const LandingPage = () => {
  return <div
   style={{
        background: "rgba(0, 0, 0, 0.1)",
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "darken",
      }}
      className="h-[calc(100vh-76px)]  bg-no-repeat bg-center flex flex-col justify-center items-center "
  ></div>;
};

export default LandingPage;
