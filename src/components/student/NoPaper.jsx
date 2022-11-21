import React from "react";

const NoPaper = () => {
  return (
    <div className="h-full w-full flex   items-center justify-center ">
      <div className="  h-[100px] w-1/2 rounded-3xl overflow-hidden flex flex-col justify-around items-center shadow-lg">
        <div className="w-full h-full text-gray-100 flex justify-around items-center ">
          <div className="text-slate-600 font-bold  w-full text-center  ">
            PAPER NOT SCHEDULED !
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPaper;
