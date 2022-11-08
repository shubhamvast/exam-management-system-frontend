import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  clearPaperQuestions,
  examQuestions,
  getAllPaperQuestions,
  getPaperQuestionsByPaper,
} from "../../actions/paperQuestion";
import {
  addStudentAnswer,
  clearStudentAnswer,
} from "../../actions/studentAnswer";
import { useNavigate } from "react-router-dom";
import { getStudentPapersByStudent } from "../../actions/studentPaperAction";
import ExamPaperTable from "./ExamPaperTable";
import NoPaper from "./NoPaper";

const ExamPaper = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.loginReducer.token);

  const [studentId, setStudentId] = useState("");

  const paperQuestions = useSelector(
    (state) => state.paperQuestionReducer.paperQuestions
  );

  useEffect(() => {
    // dispatch(clearStudentAnswer());
    dispatch(clearPaperQuestions());
  }, []);

  useEffect(() => {
    if (token) {
      const student = jwt_decode(token);
      setStudentId(student._id);
      dispatch(examQuestions(student._id));
    }
  }, [token]);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const answers = (data,paperName) => {

 

    // console.log(data,{paperName})
    const keys = Object.keys(data);

    //add student answer
    keys.map((key) => {
      if (data[key].length === 1)
        dispatch(
          addStudentAnswer({
            answer: data[key][0],
            paperQuestion: key,
            student: studentId,
          })
        );
    });
    navigate("/student/result");
  };
  return paperQuestions.length == 0 ? (
    <NoPaper />
  ) : (
    <ExamPaperTable
      handleSubmit={handleSubmit}
      answers={answers}
      register={register}
      paperQuestions={paperQuestions}
    />
  );
};

export default ExamPaper;
