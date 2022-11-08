import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getAllStudents } from "../../actions/userAction";
import { getAllPapers } from "../../actions/paperAction";
import { getCurrentStudentPaper, updateStudentPaper } from "../../actions/studentPaperAction";
import printText from "../../commonMethods/printText";
import { IoClose } from "react-icons/io5";

export function getStudentPaperId({ params }) {
  const studentPaperId = params.studentPaperId;
  return studentPaperId;
}

const UpdateStudentPaper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentPaperId = useLoaderData();

  const currentStudentPaper = useSelector(
    (state) => state.studentPaperReducer.currentStudentPaper
  );

  const students = useSelector((state) => state.userReducer.users);
  const papers = useSelector((state) => state.paperReducer.papers);
  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getAllPapers());
    dispatch(getCurrentStudentPaper(studentPaperId));
  }, []);

  useEffect(() => {
    setValue("paper", currentStudentPaper.paper?._id);
    setValue("student", currentStudentPaper.student?._id);
    setValue("_id",currentStudentPaper._id)
  }, [currentStudentPaper]);

  const schema =  yup.object().shape({
    student:yup.string().required("Please Select student"),
    paper:yup.string().required("Please Select paper")
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
      dispatch(updateStudentPaper(data));
      navigate("/paperSetter/dashboard/studentPapers");
  };

  const navigateToStudentPaper = () => {
    navigate("/paperSetter/dashboard/studentPapers");
  };

  return (
    <form
      className="  w-2/5 mx-auto my-5 px-10 py-5 border-2 rounded-xl shadow-4xl  border-yellow-300"
      onSubmit={handleSubmit(onSubmitHandler)}
    >

<div className="h-10 w-full flex justify-end ">
        <IoClose
          className=" p-1 cursor-pointer text-center  rounded-full hover:bg-slate-300   bg-slate-100"
          onClick={navigateToStudentPaper}
          size={35}
        />
      </div>
    <div>
    <div className="flex flex-col justify-center items-center mb-6 mt-[-20px]">
        <span className="font-semibold text-lg mb-2 ">Re-Assign Paper</span>
        <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
      </div>
      <div className="grid gap-6 mb-6  ">
        <div>
          <select
            {...register("student")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
          >
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {printText(student.firstName + " "+ student.lastName)}
              </option>
            ))}
          </select>
          <p className="text-red-500">{errors.student?.message}</p>
        </div>
        <div>
          <select
            {...register("paper")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
          >
            {papers.map((paper) => (
              <option key={paper._id} value={paper._id}>
                {printText(paper.name)}
              </option>
            ))}
          </select>
          <p className="text-red-500">{errors.paper?.message}</p>
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <button
          type="submit"
          className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-2/3 mt-2  py-2.5 text-center mb-6 "
        >
          Assign
        </button>
      </div>
    </div>
    </form>
  );
};

export default UpdateStudentPaper;
