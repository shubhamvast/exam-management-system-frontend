import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSubject, getAllSubjects } from "../../actions/subjectAction";
import AdminItemsTable from "./AdminItemsTable";

function Subject() {
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const dispatch = useDispatch();
  const [count, setCount] = useState(10);
  const [pageSize, setPageSize] = useState(8);

  const handlePageChange = () => {
    console.log("in handle page change");
  };
  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);

  //delete subject
  const handleSubjectDelete = (id) => {
    dispatch(deleteSubject(id));
  };

  return (
    <div>
      {subjects == 0 ? (
        <>
          <div className="h-full w-full flex mt-20  items-center justify-center">
            <div className="  h-[100px] w-1/2 rounded-3xl border-2 border-yellow-100 overflow-hidden flex flex-col justify-around items-center ">
              <div className="w-full h-full bg-[#E4E4E7]  flex justify-around items-center ">
                <div className="text-slate-600 font-bold  w-full text-center">
                  NO SUBJECTS !
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <AdminItemsTable
          items={subjects}
          head="Subject Name"
          text="name"
          handleDelete={handleSubjectDelete}
          count={count}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Subject;
