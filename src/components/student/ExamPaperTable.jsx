import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import printQuestionAnswer from "../../commonMethods/printQuestionAnswer";
import printText from "../../commonMethods/printText";
import NoPaper from "./NoPaper";

const ExamPaperTable = (props) => {
  const { handleSubmit, answers, register, paperQuestions } = props;

  const navigate = useNavigate();

  return (
    <>
      <div className=" h-[calc(100vh-160px)] ">
        <div className="h-10 w-full bg-[#172337] text-slate-300 flex items-center justify-between pl-4 pr-24">
          <span>
            {" "}
            <span className="text-xl">
              {printText(paperQuestions[0].paper?.name + "  ")}
            </span>
            Questions
          </span>
          <span>Select answer</span>
        </div>
        <form
          onSubmit={handleSubmit((data) =>
            answers(data, paperQuestions[0].paper?.name)
          )}
          className="h-full "
        >
          <div className="h-full w-full border-2  paperWindow">
            {paperQuestions.map((paperQuestion, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="min-h-16 py-2.5 flex  border-b-2 place-items-center"
                  >
                    <div className="h-full w-3/4   pl-2">
                      <div className="h-1/2 mb-2  w-full flex items-baseline flex-wrap">
                        <div className="h-full w-fit pr-[1px] -mr-3  flex  ">
                          {index + 1}.
                        </div>
                        <p className="h-full  font-normal text-lg ml-4">
                          {printQuestionAnswer(
                            paperQuestion.question?.questionText
                          )}
                        </p>
                      </div>
                      <div className="h-1/2 text-sm flex justify-start flex-wrap  ">
                        <span className=" w-1/2">
                          <i className="font-semibold">A.</i>
                          <span className="text-base ">
                            {` ${printQuestionAnswer(
                              paperQuestion.question?.optionA
                            )}`}
                          </span>
                        </span>
                        <span className="w-1/2">
                          <i className="font-semibold">B.</i>
                          <span className="text-base">
                            {` ${printQuestionAnswer(
                              paperQuestion.question?.optionB
                            )}`}
                          </span>
                        </span>
                        <span className="w-1/2">
                          <i className="font-semibold">C.</i>
                          <span className="text-base">
                            {` ${printQuestionAnswer(
                              paperQuestion.question?.optionC
                            )}`}
                          </span>
                        </span>
                        <span className="w-1/2">
                          <i className="font-semibold">D.</i>
                          <span className="text-base">
                            {` ${printQuestionAnswer(
                              paperQuestion.question?.optionD
                            )}`}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="h-full w-fit pr-[1px] -mr-3 flex items-center">
                      {index + 1}.
                    </div>
                    <div className="h-full w-1/4 flex items-center justify-start pl-3 ">
                      <label
                        htmlFor=""
                        className="w-1/3 flex justify-evenly items-center text-lg"
                      >
                        <input
                          type="checkbox"
                          // name={index + "ch" + 1}
                          {...register(paperQuestion._id + "")}
                          value="A"
                          className="h-5 w-5 accent-[#172337]"
                        />
                        A
                      </label>
                      <label
                        htmlFor=""
                        className="w-1/3 flex justify-evenly items-center text-lg"
                      >
                        <input
                          type="checkbox"
                          // name={index + "ch" + 2}
                          {...register(paperQuestion._id + "")}
                          value="B"
                          className="h-5 w-5 accent-[#172337]"
                        />
                        B
                      </label>
                      <label
                        htmlFor=""
                        className="w-1/3 flex justify-evenly items-center text-lg"
                      >
                        <input
                          type="checkbox"
                          // name={index + "ch" + 3}
                          {...register(paperQuestion._id + "")}
                          value="C"
                          className="h-5 w-5 accent-[#172337]"
                        />
                        C
                      </label>
                      <label
                        htmlFor=""
                        className="w-1/3 flex justify-evenly items-center text-lg"
                      >
                        <input
                          type="checkbox"
                          // name={index + "ch" + 4}
                          {...register(paperQuestion._id + "")}
                          value="D"
                          className="h-5 w-5 accent-[#172337]"
                        />
                        D
                      </label>
                    </div>
                  </div>
                </>
              );
            })}
            <div className=" w-full h-12 flex justify-end items-center pr-2  pt-2">
              <button
                className="h-[34px] bg-[#172337] rounded-lg w-32 text-slate-200 font-thin hover:bg-[#273e63]"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExamPaperTable;

// {paperQuestions.map((paperQuestion, index) => {
//   return (
//     <div
//       key={index}
//       className="min-h-16  flex m-1 border-b-2 place-items-center"
//     >
//       <div className="h-full w-3/4   pl-2">
//         <div className="h-1/2  w-full flex items-baseline">
//           <div className="h-full w-fit pr-[1px] -mr-3  flex  ">
//             {index + 1}.
//           </div>
//           <p className="h-full  font-medium text-lg ml-4">
//             {paperQuestion.question?.questionText}
//           </p>
//         </div>
//         <div className="h-1/2 text-sm flex justify-start  ">
//           <span className="mr-3">
//             <i className="font-semibold">A.</i>
//             <span className="text-base">
//               {" "}
//               {` ${paperQuestion.question?.optionA}`}
//             </span>
//           </span>
//           <span className="mr-3">
//             <i className="font-semibold">B.</i>
//             <span className="text-base">
//               {" "}
//               {` ${paperQuestion.question?.optionB}`}
//             </span>
//           </span>
//           <span className="mr-3">
//             <i className="font-semibold">C.</i>
//             <span className="text-base">
//               {" "}
//               {` ${paperQuestion.question?.optionC}`}
//             </span>
//           </span>
//           <span className="mr-3">
//             <i className="font-semibold">D.</i>
//             <span className="text-base">
//               {" "}
//               {` ${paperQuestion.question?.optionD}`}
//             </span>
//           </span>
//         </div>
//       </div>
//       <div className="h-full w-fit pr-[1px] -mr-3 flex items-center">
//         {index + 1}.
//       </div>
//       <div className="h-full w-1/4 flex items-center justify-start pl-3 ">
//         <label
//           htmlFor=""
//           className="w-1/3 flex justify-evenly items-center text-lg"
//         >
//           <input
//             type="checkbox"
//             // name={index + "ch" + 1}
//             {...register(paperQuestion._id + "")}
//             value="A"
//             className="h-5 w-5 accent-[#172337]"
//           />
//           A
//         </label>
//         <label
//           htmlFor=""
//           className="w-1/3 flex justify-evenly items-center text-lg"
//         >
//           <input
//             type="checkbox"
//             // name={index + "ch" + 2}
//             {...register(paperQuestion._id + "")}
//             value="B"
//             className="h-5 w-5 accent-[#172337]"
//           />
//           B
//         </label>
//         <label
//           htmlFor=""
//           className="w-1/3 flex justify-evenly items-center text-lg"
//         >
//           <input
//             type="checkbox"
//             // name={index + "ch" + 3}
//             {...register(paperQuestion._id + "")}
//             value="C"
//             className="h-5 w-5 accent-[#172337]"
//           />
//           C
//         </label>
//         <label
//           htmlFor=""
//           className="w-1/3 flex justify-evenly items-center text-lg"
//         >
//           <input
//             type="checkbox"
//             // name={index + "ch" + 4}
//             {...register(paperQuestion._id + "")}
//             value="D"
//             className="h-5 w-5 accent-[#172337]"
//           />
//           D
//         </label>
//       </div>
//     </div>
//   );
// })}
