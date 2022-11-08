import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import score8 from "../../assets/image/score8.jpg";
import score from "../../assets/image/score.jpg";

import {
  getAllStudentAnswers,
  getStudentAnswersBystudentAndPaper,
} from "../../actions/studentAnswer";

import jwt_decode from "jwt-decode";
import { result } from "../../actions/studentPaperAction";
import printText from "../../commonMethods/printText";

const Result = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.loginReducer.token);

  const studentPaper = useSelector((state) => state.studentPaperReducer.result);

  useEffect(() => {
    if (token) {
      const student = jwt_decode(token);
      dispatch(getStudentAnswersBystudentAndPaper(student._id));
      dispatch(result(student._id));
    }
  }, [token, studentPaper[0]?._id]);

  return (
    <div className="h-full w-full flex fle rounded-md overflow-hidden ">
      <div className="h-full w-1/3 overflow-hidden">
        <img
          src={score}
          alt="success"
          srcset=""
          className="h-full w-full opacity-70"
        />
        {/* <img src={score8} alt="success" srcset="" className="h-1/2 w-full" /> */}
      </div>
      <div className="h-full w-2/3    px-12  ">
        <h1 className=" h-10 w-full font-medium text-3xl  align-middle mt-2 font-serif flex justify-center items-center ">
          SCORE CARD
        </h1>
        <h2 className=" h-16 w-full font-normal text-5xl font-serif  text-red-400  mt-3 flex justify-center items-center shadow-lg rounded-lg">
          {printText(
            studentPaper.student?.firstName + " " + studentPaper.student?.lastName
          )}
        </h2>
        <h3 className=" h-16 w-full font-normal text-3xl font-serif  text-slate-600   flex justify-center items-center shadow-md rounded-b-full">
          {printText(
            studentPaper.paper?.name.toUpperCase() 
          )}
        </h3>

        <div className="h-20 pl-4 w-full mt-4  bg-purple-400 flex justify-around items-center rounded-lg shadow-md shadow-purple-300 ">
          <div className="text-slate-600 font-medium text-2xl  w-2/5">
            Obtained Marks
          </div>
          <div className="text-slate-600 font-medium text-2xl w-1/5 flex items-center justify-center">
            {studentPaper.obtainMarks}
          </div>
        </div>

        <div className="h-20 pl-4 w-full mt-4 bg-green-400  flex justify-around items-center  rounded-lg shadow-md shadow-green-300">
          <div className="text-slate-600 font-medium text-2xl  w-2/5">
            Correct
          </div>
          <div className="text-slate-600 font-medium text-2xl w-1/5 flex items-center justify-center">
            {studentPaper.totalCorrect}
          </div>
        </div>

        <div className="w-full pl-4 h-20 mt-4 bg-pink-300 flex justify-around items-center rounded-lg shadow-md shadow-pink-200">
          <div className="text-slate-600 font-medium text-2xl  w-2/5">
            Attempted
          </div>
          <div className="text-slate-600 font-medium text-2xl w-1/5 flex items-center justify-center">
            {studentPaper.totalAttemptd}
          </div>
        </div>
        <div className="w-full pl-4 h-20 mt-4 bg-sky-200  flex justify-around items-center rounded-lg shadow-md shadow-sky-200">

          <div className="text-slate-600 font-medium text-2xl  w-2/5">
            Result
          </div>          
          <div className="text-slate-600 font-medium text-2xl  w-1/5 flex items-center justify-center">
            { studentPaper.obtainMarks >= (studentPaper.paper?.totalMarks * 35/100) ? "Pass":"Fail" }
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="h-full w-full flex   items-center justify-center">
  //     <div className="  h-[500px] w-96 rounded-3xl border-2 border-yellow-100 overflow-hidden flex flex-col justify-around items-center ">
  //       <div className="w-full h-1/5 bg-green-300 flex justify-around items-center ">
  //         <div className="text-slate-600 font-bold  w-2/5">Obtained Marks</div>
  //         <div  className="text-slate-600 font-bold ">{studentPaper.obtainMarks}</div>
  //       </div>
  //       <div className="w-full h-1/5 bg-purple-400  flex justify-around items-center">
  //         <div className="text-slate-600 font-bold  w-2/5">Correct</div>
  //         <div className="text-slate-600 font-bold ">{studentPaper.totalCorrect}</div>
  //       </div>
  //       <div className="w-full h-1/5 bg-pink-300 flex justify-around items-center">
  //         <div className="text-slate-600 font-bold w-2/5">Attempted</div>
  //         <div className="text-slate-600 font-bold ">{studentPaper.totalAttemptd}</div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Result;
