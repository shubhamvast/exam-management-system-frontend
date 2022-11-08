import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudentPaper, getAllStudentPapers } from '../../actions/studentPaperAction';
import StudentPaperItemTable from './StudentPaperItemTable';

const StudentPaper = () => {
    const studentPapers = useSelector((state)=>state.studentPaperReducer.studentPapers);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllStudentPapers());
    },[])
    useEffect(()=>{
      dispatch(getAllStudentPapers());
  },[studentPapers.length])
    const head=["Student Name","Paper"];

    const handleDelete = (id)=>{
      dispatch(deleteStudentPaper(id));
    }
    
  return (
    <div>
      {
        studentPapers == 0 ? (
        <>
          <div className="h-full w-full flex mt-20  items-center justify-center">
            <div className="  h-[100px] w-1/2 rounded-3xl border-2 border-yellow-100 overflow-hidden flex flex-col justify-around items-center ">
              <div className="w-full h-full bg-[#E4E4E7]  flex justify-around items-center ">
                <div className="text-slate-600 font-bold  w-full text-center">
                  NO ASSIGNED PAPERS !
                </div>
              </div>
            </div>
          </div>
        </>
      ) : <StudentPaperItemTable items={studentPapers} head={head} handleDelete={handleDelete} />
      }
    </div>
  )
}

export default StudentPaper