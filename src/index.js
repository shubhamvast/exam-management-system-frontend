import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import DashboardContent from "./components/admin/DashboardContent";
import LandingPage from "./components/LandingPage";
import { AdminDashbord } from "./components/admin/AdminDashbord";
import { ExaminerDashboard } from "./components/examiner/ExaminerDashboard";
import ExaminerDashboardContent from "./components/examiner/ExaminerDashboardContent";
import { PaperSetterDashboard } from "./components/paperSetter/PaperSetterDashboard";
import PaperSetterDashboardContent from "./components/paperSetter/PaperSetterDashboardContent";
import { StudentDashboard } from "./components/student/StudentDashboard";
import StudentDashboardContent from "./components/student/StudentDashboardContent";
import Subject from "./components/admin/Subject";
import Users from "./components/admin/Users";

import store from "./store";
import Topic from "./components/examiner/Topic";
import QuestionBank from "./components/examiner/QuestionBank";
import Paper from "./components/paperSetter/Paper";
import PaperQuestion from "./components/paperSetter/PaperQuestion";
import StudentPaper from "./components/paperSetter/StudentPaper";
import ExamPaper from "./components/student/ExamPaper";
import RegisterForm from "./components/RegisterForm";
import ProtectedRouter from "./components/ProtectedRouter";
import UpdateSubject, { getSubjectId } from "./components/admin/UpdateSubject";
import UpdateUser, { getUserId } from "./components/admin/UpdateUser";
import Add from "./components/admin/Add";
import AddSubject from "./components/admin/AddSubject";
import AddUser from "./components/admin/AddUser";
import UpdateTopic, { getTopicId } from "./components/examiner/UpdateTopic";
import UpdateQuestionBank, {
  getQuestionId,
} from "./components/examiner/UpdateQuestionBank";
import AddExaminerOperations from "./components/examiner/AddExaminerOperations";
import AddTopic from "./components/examiner/AddTopic";
import AddQuestionBank from "./components/examiner/AddQuestionBank";
import AddPaper from "./components/paperSetter/AddPaper";
import AddPaperSetterOperations from "./components/paperSetter/AddPaperSetterOperations";
import UpadatePaper, {
  getPaperId,
} from "./components/paperSetter/UpadatePaper";
import AddStudentPaper from "./components/paperSetter/AddStudentPaper";
import UpdateStudentPaper, {
  getStudentPaperId,
} from "./components/paperSetter/UpdateStudentPaper";
import Result from "./components/student/Result";
import NoPaper from "./components/student/NoPaper";
import ChangeAdminPassword from "./components/admin/ChangeAdminPassword";
import UpdateAdminProfile from "./components/admin/UpdateAdminProfile";
import ChangeExaminerPassword from "./components/examiner/ChangeExaminerPassword";
import UpadateExaminerProfile from "./components/examiner/UpdateExaminerProfile";
import ChangePaperSetterPassword from "./components/paperSetter/ChangePaperSetterPassword";
import UpadatePaperSetterProfile from "./components/paperSetter/UpadatePaperSetterProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRouter>
            <AdminDashbord />
          </ProtectedRouter>
        ),
        children: [
          {
            path: "dashboard",
            element: <DashboardContent />,
            children: [
              {
                path: "subjects",
                element: <Subject />,
              },

              {
                path: "subjects/:subjectId",
                loader: getSubjectId,
                element: <UpdateSubject />,
              },
              {
                path: "users",
                element: <Users />,
              },
              {
                path: "users/:userId",
                loader: getUserId,
                element: <UpdateUser />,
              },
            ],
          },
          {
            path: "add",
            element: <Add />,
            children: [
              {
                path: "subject",
                element: <AddSubject />,
              },

              {
                path: "user",
                element: <AddUser />,
              },
            ],
          },

          {
            path: "changePassword",
            element: <ChangeAdminPassword />,
          },
          {
            path: "changeProfile",
            element: <UpdateAdminProfile />,
          },
        ],
      },

      {
        path: "/examiner",
        element: (
          <ProtectedRouter>
            <ExaminerDashboard />
          </ProtectedRouter>
        ),
        children: [
          {
            path: "dashboard",
            element: <ExaminerDashboardContent />,
            children: [
              {
                path: "topics",
                element: <Topic />,
              },
              {
                path: "topics/:topicId",
                loader: getTopicId,
                element: <UpdateTopic />,
              },

              {
                path: "questionBank",
                element: <QuestionBank />,
              },
              {
                path: "questionBank/:questionId",
                loader: getQuestionId,
                element: <UpdateQuestionBank />,
              },
            ],
          },
          {
            path: "add",
            element: <AddExaminerOperations />,
            children: [
              {
                path: "topic",
                element: <AddTopic />,
              },

              {
                path: "questionBank",
                element: <AddQuestionBank />,
              },
            ],
          },
          {
            path: "changePassword",
            element: <ChangeExaminerPassword/>,
          },
          {
            path: "changeProfile",
            element: <UpadateExaminerProfile />,
          },
        ],
      },
      {
        path: "paperSetter",
        element: (
          <ProtectedRouter>
            <PaperSetterDashboard />
          </ProtectedRouter>
        ),
        children: [
          {
            path: "dashboard",
            element: <PaperSetterDashboardContent />,
            children: [
              {
                path: "papers",
                element: <Paper />,
              },
              {
                path: "papers/:paperId",
                loader: getPaperId,
                element: <UpadatePaper />,
              },
              {
                path: "paperQuestions",
                element: <PaperQuestion />,
              },
              {
                path: "studentPapers",
                element: <StudentPaper />,
              },
              {
                path: "studentPapers/:studentPaperId",
                loader: getStudentPaperId,
                element: <UpdateStudentPaper />,
              },
            ],
          },
          {
            path: "add",
            element: <AddPaperSetterOperations />,
            children: [
              {
                path: "paper",
                element: <AddPaper />,
              },

              {
                path: "questionBank",
                element: <AddStudentPaper />,
              },
            ],
          },
          {
            path: "changePassword",
            element: <ChangePaperSetterPassword/>,
          },
          {
            path: "changeProfile",
            element: <UpadatePaperSetterProfile/>,
          },
          
        ],
      },
      {
        path: "student",
        element: (
          <ProtectedRouter>
            <StudentDashboard />
          </ProtectedRouter>
        ),
        children: [
          {
            path: "dashboard",
            element: <StudentDashboardContent />,
            children: [
              {
                path: "exampaper",
                element: <ExamPaper />,
              },
            ],
          },
          {
            path: "result",
            element: <Result />,
          },
          {
            path: "nopaper",
            element: <NoPaper />,
          },
          {
            path: "changePassword",
            element: <ChangePaperSetterPassword/>,
          },
        ],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* //to provide store to all the components in app */}
    <RouterProvider router={router} />
  </Provider>
  //  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
