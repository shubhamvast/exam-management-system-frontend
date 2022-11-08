import { useState } from "react";
import { set } from "react-hook-form";
import { useDispatch } from "react-redux";
import { activeQuestion } from "../../actions/questionAction";
import printQuestionAnswer from "../../commonMethods/printQuestionAnswer";

const PaperQuestionTable = (props) => {
  const { questions, head, text, handleClick } = props;
  const [button, setButton] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="overflow-auto  paperWindow h-full w-full">
      <table className="table-auto border-collapse  w-full mt-2 ">
        <thead>
          <tr className="bg-[#172337] text-white h-10 flex justify-between items-center pr-24">
            {head.map((h, index) => {
              return (
                <th
                  key={index}
                  className=" text-left pl-6 font-thin text-gray-100"
                >
                  {h}
                </th>
              );
            })}
            <th className=" text-center font-thin  text-gray-100 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => {
            return (
              <tr
                key={index}
                className=" h-16  flex justify-between items-center pr-20 border-b-2 border-gray-100"
              >
                <td className="w-full text-left pl-4 font-normal text-gray-600  ">
                  <div>
                    <span className="mr-1">{index + 1}</span>
                    <span className="mx-2">
                      {printQuestionAnswer(question[text])}
                    </span>
                  </div>
                </td>
                <td className="  text-gray-500  flex   ">
                  {question.isActive ? (
                    <button
                      className="bg-red-500 px-2 py-1 rounded-lg cursor-pointer text-white"
                      onClick={() => {
                        handleClick(question._id, "Remove");
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 px-6 py-1 rounded-lg cursor-pointer text-white"
                      onClick={() => {
                        handleClick(question._id, "Add");
                      }}
                    >
                      Add
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaperQuestionTable;
