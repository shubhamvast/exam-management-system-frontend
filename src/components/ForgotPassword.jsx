import React from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../actions/userAction";

const schema = yup.object().shape({
  email: yup.string().required("Please enter Email id").min(5).max(255).email(),
  // password: yup.string().required("Please enter Password").min(8).max(1024),
});

const ForgotPassword = () => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch()
  const hadleForgotPassword = (data) => {
    console.log(data);

    dispatch(forgotPassword(data))
  };

  return (
    <div className="h-[calc(100vh-76px)] w-full flex items-center justify-center">
      <div className="min-h-2/4  w-96 bg-white px-10 py-4 rounded-lg shadow-2xl ">
        <form
          onSubmit={handleSubmit(hadleForgotPassword)}
          className="flex flex-col justify-center  "
        >
          <h1 className="text-center text-2xl">Forgot Password</h1>
          <hr className="my-2 h-1 bg-yellow-300  border border-yellow-300 rounded-xl " />
          <label className=" my-2">
            Email Id
            <br />
            <input
              type="text"
              name="email"
              id="email"
              {...register("email")}
              className="border-2 rounded-full p-3 w-full outline-none focus:border-blue-300"
            />
          </label>
          <p className="text-red-400">{errors.email?.message}</p>

          <button
            type="submit"
            className="w-full rounded-full bg-slate-700 border-2  p-3 text-white my-2 mt-4 hover:bg-slate-800 focus:bg-slate-800 hover:border-orange-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
