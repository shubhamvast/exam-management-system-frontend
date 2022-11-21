import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { changePassword } from "../../actions/userAction";
import jwt_decode from "jwt-decode";

const ChangeAdminPassword = () => {
  const token = useSelector((state) => state.loginReducer.token);
  const [decode, setDecode] = useState("");
  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token);
      setDecode(decode);
    }
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required("Fill the password")
      .min(8, "Password must be 8 character long")
      .max(256),

    newPassword: yup
      .string()
      .required("Fill the password")
      .min(8, "Password must be 8 character long")
      .max(256),

    confirmPassword: yup
      .string()
      .required("Password is mendatory")
      .oneOf([yup.ref("newPassword")], "Passwords does not match"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
    dispatch(changePassword({ ...data, id: decode._id }));
    reset();
  };

  const navigateToSubject = () => {
    navigate("/examiner/dashboard/topics");
  };

  return (
    <form
      className="  w-2/5 mx-auto my-16  px-14 py-5 border-2 rounded-xl shadow-4xl  border-yellow-300 flex flex-col"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="h-10 w-full flex justify-end ">
        <IoClose
          className=" p-1 cursor-pointer text-center  rounded-full hover:bg-slate-300   bg-slate-100"
          onClick={navigateToSubject}
          size={35}
        />
      </div>
      <div>
        <div className="flex flex-col justify-center items-center mb-6 mt-[-20px]">
          <span className="font-semibold text-lg mb-2 ">Change Password</span>
          <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
        </div>
        <div className="grid gap-6 mb-6  ">
          <div className="h-48 flex flex-col justify-around items-center">
            <input
              type="password"
              id="oldPassword"
              className="bg-gray-40 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
              placeholder="Old Password"
              required=""
              {...register("oldPassword")}
            />
            <p className="text-red-500">{errors.oldPassword?.message}</p>
            <input
              type="password"
              id="newPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
              placeholder="New Password"
              required=""
              {...register("newPassword", {
                validate: (val) => {
                  if (watch("oldPassword") === val) {
                    return "New password should not match with old password";
                  }
                },
              })}
            />
            <p className="text-red-500">{errors.newPassword?.message}</p>

            <input
              type="password"
              id="confirmPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
              placeholder="Confirm Password"
              required=""
              {...register("confirmPassword")}
            />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          </div>
        </div>
        <div className="w-full flex justify-center mb-6">
          <button
            type="submit"
            className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-2/3 mt-2  py-2.5 text-center "
          >
            Change
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangeAdminPassword;
