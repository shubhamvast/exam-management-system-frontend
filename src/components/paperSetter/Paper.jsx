import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePaper, getAllPapers } from "../../actions/paperAction";
import PaperSetterItemsTable from "./PaperSetterItemsTable";

const Paper = () => {
  const dispatch = useDispatch();
  const papers = useSelector((state) => state.paperReducer.papers);
  useEffect(() => {
    dispatch(getAllPapers());
  }, []);

  useEffect(()=>{
    dispatch(getAllPapers());
  },[papers.length]);

  const head = ["Name"];

 const navigate =  useNavigate()
  const handlePaperDelete = (id)=>{
    dispatch(deletePaper(id));
    navigate("/paperSetter/dashboard")
    dispatch(getAllPapers());
  }

  return (
    <div>
     { papers.length === 0 ? (
        <>
          <div className="h-full w-full flex mt-20  items-center justify-center">
            <div className="  h-[100px] w-1/2 rounded-3xl border-2 border-yellow-100 overflow-hidden flex flex-col justify-around items-center ">
              <div className="w-full h-full bg-[#E4E4E7]  flex justify-around items-center ">
                <div className="text-slate-600 font-bold  w-full text-center">
                  NO PAPERS !
                </div>
              </div>
            </div>
          </div>
        </>
      ) : <PaperSetterItemsTable
        items={papers}
        head={head}
        text="name"
        handleDelete={handlePaperDelete}
      />}
    </div>
  );
};

export default Paper;
