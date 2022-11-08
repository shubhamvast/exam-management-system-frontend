import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getAllTopics } from "../../actions/topicAction";
import {
  getCurrentQuestion,
  updateQuestion,
} from "../../actions/questionAction";
import { getAnswerOptionsById } from "../../actions/answerOption";
import printText from "../../commonMethods/printText";
import { IoClose } from "react-icons/io5";

export function getQuestionId({ params }) {
  const questionId = params.questionId;
  return questionId;
}

const UpdateQuestionBank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questionId = useLoaderData();

  const topics = useSelector((state) => state.topicReducer.topics);
  const currentQuestion = useSelector(
    (state) => state.questionReducer.currentQuestion
  );

  useEffect(() => {
    dispatch(getCurrentQuestion(questionId));
    dispatch(getAllTopics());
  }, []);

  useEffect(() => {
    setValue("_id", currentQuestion._id);
    setValue("answer", currentQuestion.correctOption?.option);
    setValue("complexityLevel", currentQuestion.complexityLevel);
    setValue("marks", currentQuestion.marks);
    setValue("questionText", currentQuestion.questionText);
    setValue("topic", currentQuestion.topic?._id);
    setValue("optionA", currentQuestion.optionA);
    setValue("optionB", currentQuestion.optionB);
    setValue("optionC", currentQuestion.optionC);
    setValue("optionD", currentQuestion.optionC);
  }, [currentQuestion]);

  const schema = yup.object().shape({
    answer: yup.array(),
    // .of(yup.string().required("please choose correct option")),
    complexityLevel: yup.string().required("Please Choose level"),
    marks: yup.number().required("Please enter marks"),
    optionA: yup.string().required("Please provide option"),
    optionB: yup.string().required("Please provide option"),
    optionC: yup.string().required("Please provide option"),
    optionD: yup.string().required("Please provide option"),
    questionText: yup.string().required("Please provide question"),
    topic: yup.string().required("Please choose topic"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
    dispatch(updateQuestion(data));
    navigate("/examiner/dashboard/questionBank");
  };

  const navigateToQuestionBank = () => {
    navigate("/examiner/dashboard/questionBank");
  };

  return (
    <form
      className="  w-4/5 mx-auto my-5 px-14 py-5 border-2 rounded-xl shadow-4xl  overflow-auto  border-yellow-300"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="h-10 w-full flex justify-end ">
        <IoClose
          className=" p-1 cursor-pointer text-center  rounded-full hover:bg-slate-300   bg-slate-100"
          onClick={navigateToQuestionBank}
          size={35}
        />
      </div>

      <div>
        <div className="flex flex-col justify-center items-center mb-4 mt-[-20px]">
          <span className="font-semibold text-lg mb-2 ">
            Upadate Question in Bank
          </span>
          <hr className="h-[2px] w-full  border-yellow-300 bg-yellow-500" />
        </div>

        <div className="w-full h-full flex justify-between  ">
          <div className="w-1/2 pr-2">
            <div className="grid gap-6 mb-6  ">
              <div className="">
                <label
                  htmlFor="questionText"
                  className="block mb-2 text-sm font-medium  dark:text-gray-300"
                >
                  Question
                </label>
                <input
                  type="text"
                  id="questionText"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
                  placeholder="What is javascript?"
                  required=""
                  {...register("questionText")}
                />
                <p className="text-red-500">{errors.questionText?.message}</p>
              </div>
              <div className="">
                <label
                  htmlFor="topic"
                  className="block mb-2 text-sm font-medium dark:text-gray-300"
                >
                  Topic
                </label>
                <select
                  {...register("topic")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
                >
                  <option value="">Select Topic</option>
                  {topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {printText(topic.name)}
                    </option>
                  ))}
                </select>
                <p className="text-red-500">{errors.topic?.message}</p>
              </div>
              <div className="">
                <label
                  htmlFor="marks"
                  className="block mb-2 text-sm font-medium  dark:text-gray-300"
                >
                  Marks
                </label>
                <input
                  type="number"
                  id="marks"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
                  placeholder="2"
                  required=""
                  {...register("marks")}
                />
                <p className="text-red-500">
                  {errors.marks ? "Must be a number" : ""}
                </p>
              </div>
              <div className="">
                <label
                  htmlFor="complexityLevel"
                  className="block mb-2 text-sm font-medium dark:text-gray-300"
                >
                  Complexity Level
                </label>
                <select
                  {...register("complexityLevel")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-center dark:focus:border-yellow-500 outline-none "
                >
                  <option value="">Select Level</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="difficult">Difficult</option>
                </select>
                <p className="text-red-500">
                  {errors.complexityLevel?.message}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="grid gap-6 mb-6  ">
              <div className="">
                <label
                  htmlFor="optionA"
                  className="block mb-2 text-sm font-medium  dark:text-gray-300"
                >
                  Option A
                </label>
                <input
                  type="text"
                  id="optionA"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
                  placeholder="option text"
                  required=""
                  {...register("optionA")}
                />
                <div className="w-full flex items-center justify-center text-base">
                  <label htmlFor="A">Correct</label>
                  &nbsp; &nbsp;
                  <input
                    type="checkbox"
                    {...register("answer")}
                    value="A"
                    className="h-4 w-4"
                  />
                </div>

                <p className="text-red-500">{errors.optionA?.message}</p>
              </div>
              <div className="">
                <label
                  htmlFor="optionB"
                  className="block mb-2 text-sm font-medium  dark:text-gray-300"
                >
                  Option B
                </label>
                <input
                  type="text"
                  id="optionB"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
                  placeholder="option text"
                  required=""
                  {...register("optionB")}
                />
                <div className="w-full flex items-center justify-center text-base">
                  <label htmlFor="B">Correct</label>
                  &nbsp; &nbsp;
                  <input
                    type="checkbox"
                    {...register("answer")}
                    value="B"
                    className="h-4 w-4"
                  />
                </div>
                <p className="text-red-500">{errors.optionB?.message}</p>
              </div>
              <div className="">
                <label
                  htmlFor="optionC"
                  className="block mb-2 text-sm font-medium  dark:text-gray-300"
                >
                  Option C
                </label>
                <input
                  type="text"
                  id="optionC"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
                  placeholder="option text"
                  required=""
                  {...register("optionC")}
                />
                <div className="w-full flex items-center justify-center text-base">
                  <label htmlFor="C">Correct</label>
                  &nbsp; &nbsp;
                  <input
                    type="checkbox"
                    {...register("answer")}
                    value="C"
                    className="h-4 w-4"
                  />
                </div>
                <p className="text-red-500">{errors.optionC?.message}</p>
              </div>
              <div className="">
                <label
                  htmlFor="optionD"
                  className="block mb-2 text-sm font-medium  dark:text-gray-300"
                >
                  Option D
                </label>
                <input
                  type="text"
                  id="optionD"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full  focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-yellow-500 outline-none pl-6"
                  placeholder="option text"
                  required=""
                  {...register("optionD")}
                />
                <div className="w-full flex items-center justify-center text-base">
                  <label htmlFor="D">Correct</label>
                  &nbsp; &nbsp;
                  <input
                    type="checkbox"
                    {...register("answer")}
                    value="D"
                    className="h-4 w-4"
                  />
                </div>
                <p className="text-red-500">{errors.optionD?.message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[20px] w-full text-center text-red-500 font-normal mb-2">
          {errors.answer ? "Choose correct option" : ""}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            // className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm h-full w-full mb-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

            className=" text-white bg-[#1A212D] hover:bg-[#323d52] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-yellow-500 font-medium rounded-full text-sm h-full w-3/5 mt-2 px-5 py-2.5 text-center mb-4 "
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateQuestionBank;
