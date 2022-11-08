import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPapers } from "../../actions/paperAction";
import {
  addPaperQuestion,
  deletePaperQuestion,
  getAllPaperQuestions,
} from "../../actions/paperQuestion";
import {
  activeQuestion,
  getAllQuestions,
  getQuestionBySubject,
} from "../../actions/questionAction";
import printText from "../../commonMethods/printText";
import PaperQuestionTable from "./PaperQuestionTable";
import PaperSetterItemsTable from "./PaperSetterItemsTable";

const PaperQuestion = (props) => {
  const paperQuestions = useSelector(
    (state) => state.paperQuestionReducer.paperQuestions
  );
  const questions = useSelector((state) => state.questionReducer.questions);
  const papers = useSelector((state) => state.paperReducer.papers);
  const [subjectSearch, setSubjectSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPapers());
    dispatch(getAllQuestions());
    // dispatch(getQuestionBySubject());
  }, []);

  useEffect(() => {
    dispatch(getQuestionBySubject(subjectSearch));
  }, [questions.length,paperQuestions.length]);




  const head = ["Question"];

  const handleChange = (subjectId) => {
    setSubjectSearch(subjectId);

    dispatch(getQuestionBySubject(subjectId));
  };

  const handleClick = (id, operation) => {
    if (operation === "Add") {
      dispatch(addPaperQuestion({ question: id, paper: subjectSearch }));
    }
    if (operation === "Remove") {
      dispatch(deletePaperQuestion(id));
    }

    dispatch(getAllPaperQuestions());


  };

  return (
    <div className="h-[calc(100vh-190px)] w-full">
      <select
        name="subject"
        id="subject"
        className="w-44 h-10 border-2 rounded-md py-1 pl-4 text-left mt-2"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        <option value="">Select Paper</option>
        {papers.map((paper) => {
          return (
            <option key={paper._id} value={paper._id}>
              {printText(paper.name)}
            </option>
          );
        })}
      </select>

     {
      questions == 0 ? (
        <>
          <div className="h-full w-full flex mt-20  items-center justify-center">
            <div className="  h-[100px] w-1/2 rounded-3xl border-2 border-yellow-100 overflow-hidden flex flex-col justify-around items-center ">
              <div className="w-full h-full bg-[#E4E4E7]  flex justify-around items-center ">
                <div className="text-slate-600 font-bold  w-full text-center">
                  NO QUESTIONS FOR SELECTED PAPER !
                </div>
              </div>
            </div>
          </div>
        </>
      ) :<PaperQuestionTable
        handleClick={handleClick}
        questions={questions}
        head={head}
        text="questionText"
      />
     }
    </div>
  );
};

export default PaperQuestion;
