import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getAllSubjects } from "../../actions/subjectAction";
import { addPaper } from "../../actions/paperAction";
import printText from "../../commonMethods/printText";
import { IoClose } from "react-icons/io5";
const AddPaper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(255),
    subject: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);

  const onSubmitHandler = (data) => {
    dispatch(addPaper(data));
    navigate("/paperSetter/dashboard/papers");
  };


  const navigateToPaper = () => {
    navigate("/paperSetter/dashboard/papers");
  };


  return (
    <form
      className="  w-2/5 mx-auto my-5 px-10 py-5 border-2 rounded-xl shadow-4xl  border-yellow-300 flex flex-col"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="h-10 w-full flex justify-end ">
        <IoClose
          className=" p-1 cursor-pointer text-center  rounded-full hover:bg-slate-300   bg-slate-100"
          onClick={navigateToPaper}
          size={35}
        />
      </div>
     <div>
     <div className="flex flex-col justify-center items-center mb-6 mt-[-20px]">
        <span className="font-semibold text-lg mb-2 ">Add Paper</span>
        <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
      </div>
      <div className="grid gap-6 mb-6  ">
        <div className="">
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
            placeholder="Paper name"
            required=""
            {...register("name")}
          />
          <p className="text-red-500">{errors.name?"Please enter paper name":""}</p>
        </div>
        <div>
          <select
            {...register("subject")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {printText(subject.name)}
              </option>
            ))}
          </select>
          <p className="text-red-500">{errors.subject?"Please choose subject":""}</p>
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <button
          type="submit"
          className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-2/3 mt-2  py-2.5 text-center mb-6"
        >
          Add
        </button>
      </div>
     </div>
    </form>
  );
};

export default AddPaper;
