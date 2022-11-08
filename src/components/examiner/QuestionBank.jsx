import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestion,
  filterQuestions,
  getAllQuestions,
} from "../../actions/questionAction";
import { getAllSubjects } from "../../actions/subjectAction";
import { getAllTopics, getTopicsBySubject } from "../../actions/topicAction";
import printText from "../../commonMethods/printText";
import ExaminerItemsTable from "./ExaminerItemsTable";

const QuestionBank = () => {
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const topics = useSelector((state) => state.topicReducer.topics);
  const questions = useSelector((state) => state.questionReducer.questions);

  const [searchSubject, setSearchSubject] = useState("");
  const [searchTopic, setSearchTopic] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubjects());
    dispatch(filterQuestions(searchSubject, searchTopic));
  }, []);
  useEffect(() => {
    dispatch(getAllSubjects());
  },[subjects.length]);

  const head = ["Question", "Answer"];

  const handeleDeleteQuestionBank = (id) => {
    dispatch(deleteQuestion(id));
  };

  const handleSubject = (subjectId) => {
    setSearchSubject(subjectId);
    dispatch(filterQuestions({ searchSubject: subjectId,searchTopic: searchTopic  }));
    dispatch(getTopicsBySubject(subjectId));
    dispatch(getAllSubjects());
  };
  const handleTopic = (topicId) => {
    setSearchTopic(topicId);
    dispatch(filterQuestions({ searchSubject, searchTopic: topicId }));
  };
  return (
    <div>
      <div className="flex mt-2">
        <select
          name="subject"
          id="subject"
          className="w-44 h-10 border-2 rounded-md py-1 pl-4 text-left"
          onChange={(e) => handleSubject(e.target.value)}
        >
          <option value="">All Subject</option>
          {subjects.map((subject) => {
            return (
              <option key={subject._id} value={subject._id}>
                {printText(subject.name)}
              </option>
            );
          })}
        </select>

        {topics.length == 0 ? (
          ""
        ) : (
          <select
            name="topic"
            id="topic"
            className="w-44 h-10 ml-4 border-2 rounded-md py-1 pl-4 text-left"
            onChange={(e) => handleTopic(e.target.value)}
          >
            <option value="">All Topic</option>
            {topics.map((topic) => {
              return (
                <option key={topic._id} value={topic._id}>
                  {printText(topic.name)}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div>
        {questions == 0 ? (
          <>
            <div className="h-full w-full flex mt-20  items-center justify-center">
              <div className="  h-[100px] w-1/2 rounded-3xl border-2 border-yellow-100 overflow-hidden flex flex-col justify-around items-center ">
                <div className="w-full h-full bg-[#E4E4E7]  flex justify-around items-center ">
                  <div className="text-slate-600 font-bold  w-full text-center">
                    NO QUESTIONS !
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <ExaminerItemsTable
            head={head}
            items={questions}
            text="questionText"
            answerText=""
            handleDelete={handeleDeleteQuestionBank}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
