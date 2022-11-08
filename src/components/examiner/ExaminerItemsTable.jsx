import React from "react";
import { TfiPencil } from "react-icons/tfi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import printText from "../../commonMethods/printText";
import printQuestionAnswer from "../../commonMethods/printQuestionAnswer";

const ExaminerItemsTable = (props) => {
  const { items, head, text, handleDelete } = props;
  return (
    <div className="h-[calc(100vh-60px)] w-full overflow-auto paperWindow">
      <table className="table-auto border-collapse  w-full mt-2 ">
        <thead>
          <tr className="bg-[#172337] text-white h-10 flex justify-between items-center pr-24">
            {head.map((h) => {
              return (
                <th key={h} className=" text-left pl-6 font-thin text-gray-100">
                  {h}
                </th>
              );
            })}
            <th className=" text-center font-thin  text-gray-100 ">Actions</th>
          </tr>
        </thead>
        <tbody >
          {items.map((item, index) => {
            return (
              <tr
                key={index}
                className=" min-h-16 py-2.5  w-full flex justify-between items-center pr-20 border-b-2 border-gray-100"
              >
                <td className=" w-full text-left pl-4 font-normal text-gray-600  ">
                  <div>
                    <span className="mr-1">{index + 1}</span>
                    <span className="mx-2">
                      {printQuestionAnswer(item[text]?.trim())}
                    </span>
                  </div>
                </td>
                <td className=" w-full text-left pl-4 font-normal text-gray-600  ">
                  <span className="mx-2">
                    {item.correctOption?.optionText?.trim()}
                  </span>
                </td>
                <td className=" text-gray-500  flex  ">
                  <span>
                    <NavLink to={`${item._id}`}>
                      <TfiPencil
                        size={30}
                        className="rounded-full bg-slate-100 p-1 mx-1 text-neutral-500 hover:bg-slate-200 cursor-pointer"
                      />
                    </NavLink>
                  </span>
                  <span>
                    <NavLink onClick={() => handleDelete(item._id)}>
                      <MdOutlineDeleteOutline
                        size={30}
                        className="rounded-full bg-slate-100 p-1 mx-1 text-neutral-500 hover:bg-slate-200 cursor-pointer"
                      />
                    </NavLink>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExaminerItemsTable;
