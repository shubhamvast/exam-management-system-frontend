import React from "react";
import { TfiPencil } from "react-icons/tfi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import printText from "../../commonMethods/printText";

const UsersTable = (props) => {
  const { items, head, handleDelete, handleClick } = props;

  return (
    <>
      <table className="table-auto border-collapse  w-full mt-2 ">
        <thead>
          <tr className="bg-[#172337] text-white h-10 flex justify-between items-center pr-24">
            <th className="w-4/5 text-left pl-6 font-thin text-gray-100">
              {head}
            </th>
            <th className=" text-center font-thin  text-gray-100 ">Status</th>
            <th className=" text-center font-thin  text-gray-100 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr
                key={index}
                className=" py-2  flex justify-between items-center pr-20  border-b-2 border-gray-100 "
              >
                <td className="w-4/5 text-left pl-4 font-normal text-gray-600  ">
                  <div>
                    <span className="mr-1">{index + 1}</span>
                    <span className="mx-2">
                      {printText(item.firstName + " " + item.lastName)}
                    </span>
                  </div>
                </td>
                {/* <td>
                  <label class="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </td> */}
                <td className="  text-gray-500  flex   ">
                  {item.isActive ? (
                    <button
                      className="bg-green-500 px-4 py-1 rounded-lg cursor-pointer text-white"
                      onClick={() => {
                        handleClick(item._id, "Active");
                      }}
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 px-2 py-1 rounded-lg cursor-pointer text-white"
                      onClick={() => {
                        handleClick(item._id, "Inactive");
                      }}
                    >
                      Inactive
                    </button>
                  )}
                </td>
                <td className="  text-gray-500  flex  ">
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
    </>
  );
};

export default UsersTable;
