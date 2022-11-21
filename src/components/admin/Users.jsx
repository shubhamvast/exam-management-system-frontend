import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  softDeleteUser,
} from "../../actions/userAction";
import AdminItemsTable from "./AdminItemsTable";
import UsersTable from "./UsersTable";

function User() {
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleClick = (userId, operation) => {
    dispatch(softDeleteUser({ userId, operation }));
  };

  return (
    <div>
      {users == 0 ? (
        <>
          <div className="h-full w-full flex mt-20  items-center justify-center">
            <div className="  h-[100px] w-1/2 rounded-3xl border-2 border-yellow-100 overflow-hidden flex flex-col justify-around items-center ">
              <div className="w-full h-full bg-[#E4E4E7] flex justify-around items-center ">
                <div className="text-slate-600 font-bold  w-full text-center">
                  NO USERS !
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <UsersTable
          items={users}
          head="Name"
          handleDelete={handleDeleteUser}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default User;
