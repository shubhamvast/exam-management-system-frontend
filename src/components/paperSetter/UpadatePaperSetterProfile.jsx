import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { editProfile, getCurrentUser } from "../../actions/userAction";
import { IoClose } from "react-icons/io5";
import printText from "../../commonMethods/printText";

function UpadatePaperSetterProfile() {

  const token = useSelector((state) => state.loginReducer.token);
  const [decode, setDecode] = useState("");
  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token);

      decode.name = printText(decode.name);
      decode.role = printText(decode.role);

      setDecode(decode);
      dispatch(getCurrentUser(decode._id));
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.currentUser);
  const schema = yup.object().shape({
    firstname: yup.string().required().min(3).max(50),
    lastname: yup.string().required().min(3).max(50),
    email: yup.string().required().min(5).max(255).email(),
    phone: yup.string().required().min(10).max(10),
    username: yup.string().required().min(8).max(255),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  useEffect(() => {
    setValue("firstname", user.firstName);
    setValue("_id", user._id);
    setValue("lastname", user.lastName);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("username", user.userName);
  }, [user._id]);
  const onSubmitHandler = (data) => {
    dispatch(editProfile({...data,id:decode._id}));
    navigate("/paperSetter/dashboard/papers");
  };
  const navigateToUser = () => {
    navigate("/paperSetter/dashboard/papers");
  };


  return (
    <div className="h-[calc(100vh-60px)] w-full overflow-auto paperWindow">
      <form
        className="  w-5/12 mx-auto my-5 px-10 py-5 border-2 rounded-xl shadow-4xl  border-yellow-300 flex flex-col"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="h-10 w-full flex justify-end ">
          <IoClose
            className=" p-1 cursor-pointer text-center  rounded-full hover:bg-slate-300   bg-slate-100"
            onClick={navigateToUser}
            size={35}
          />
        </div>
        <div>
          <div className="flex flex-col justify-center items-center mb-4 mt-[-20px]">
            <span className="font-semibold text-2xl  ">{decode.name}</span>
            <p className="text-base font-semibold mb-1">{decode.role}</p>

            <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
          </div>
          <div className="grid gap-6 mb-6  ">
            <div className="">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium  dark:text-gray-300"
              >
                First name
              </label>
              <input
                type="text"
                id="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
                placeholder="John"
                required=""
                {...register("firstname")}
              />
              <p className="text-yellow-100">{errors.firstname?.message}</p>
            </div>
            <div className="">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium  dark:text-gray-300"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 outline-none pl-6"
                placeholder="Doe"
                required=""
                {...register("lastname")}
              />
              <p className="text-yellow-100">{errors.lastname?.message}</p>
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium  dark:text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 outline-none pl-6"
                placeholder="john.doe@company.com"
                required=""
                {...register("email")}
              />
              <p className="text-yellow-100">{errors.email?.message}</p>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium  dark:text-gray-300"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 0 dark:focus:border-blue-500 outline-none pl-6"
                placeholder="123-45-678"
                required=""
                {...register("phone")}
              />
              <p className="text-yellow-100">{errors.phone?.message}</p>
            </div>
            <div className="">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium  dark:text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-blue-500 outline-none pl-6"
                placeholder="@shubham"
                required=""
                {...register("username")}
              />
              <p className="text-yellow-100">{errors.username?.message}</p>
            </div>
          </div>
          <button
            type="submit"
            // className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm h-full w-full mb-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

            className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-12 w-full mt-2 px-5 py-2.5 text-center mb-6 "
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpadatePaperSetterProfile