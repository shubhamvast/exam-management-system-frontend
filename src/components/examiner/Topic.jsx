import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTopic, getAllTopics } from "../../actions/topicAction";
import TopicTable from "./TopicTable";

function Topic() {
  const topics = useSelector((state) => state.topicReducer.topics);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTopics());
  }, []);

  const handleTopicDelete = (id)=>{
    dispatch(deleteTopic(id));
  }

  const head = ["Topic Name"];
  return (
    <div>

   {   topics == 0 ? (
        <>
          <div className="h-full w-full flex mt-20  items-center justify-center">
            <div className="  h-[100px] w-1/2 rounded-3xl border-2 border-yellow-100 overflow-hidden flex flex-col justify-around items-center ">
              <div className="w-full h-full bg-[#E4E4E7]  flex justify-around items-center ">
                <div className="text-slate-600 font-bold  w-full text-center">
                  NO TOPICS !
                </div>
              </div>
            </div>
          </div>
        </>
      ) :<TopicTable items={topics} head={head} text="name" handleDelete={handleTopicDelete} />}
    </div>
  );
}

export default Topic;
