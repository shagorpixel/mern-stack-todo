import React from 'react';

const TaskStatus = ({selectedStatus,setSelectedStatus}) => {
    const taskStatus = ["All","Pending","Complete"]
    return (
        <div className=' w-auto flex items-center justify-center space-x-2 bg-gray-100 rounded-full p-1'>
            {
                taskStatus.map((task,index)=>(
                    <span key={index} onClick={()=>setSelectedStatus(prev=>prev==task?"All":task)} className={`text-lg py-1 px-5 cursor-pointer rounded-full ${selectedStatus == task ?"bg-green-600 text-white":"bg-gray-300"} `} >{task}</span>
                ))
            }
        </div>
    );
};

export default TaskStatus;