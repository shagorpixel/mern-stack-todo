const Tasks = require("../Model/Tasks");

const createTask = async (req,res)=>{
    try{
        
        const newTask = new Tasks(req.body);
        await newTask.save();
        console.log("Task Added");
        res.status(201).json({
            message:" Added Successfully",
            data:newTask
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
        console.log(error);
        console.log(req.body);
    }
}
const getTask = async(req,res)=>{
   try{
    const completed =  req.query.completed;
    const filter = {};
    if(completed=="false"){
        filter.completed = false
    }else if(completed=="true"){
        filter.completed = true
    }
    const allTask = await Tasks.find(filter).sort({createdAt:-1});
    res.status(200).json(allTask)
   }catch(error){
        res.status(500).json({
            message:error.message
        })
   }
}
const singleTask = async(req,res)=>{
    try{
      const task = await Tasks.findOne({_id:req.params.id});
      res.status(200).json(task);
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
const upDateTask = async(req,res)=>{
    try{
        const id = req.params.id;
       await Tasks.updateOne({_id:id},{$set:req.body});
       res.status(201).json({
        message:'Data Update Successfully'
       })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
const deleteTask = async(req,res)=>{
    
    try{
        await Tasks.deleteOne({_id:req.params.id});
        res.status(201).json({
            message:'Data Delte Successfull'
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports = {createTask,getTask,upDateTask,singleTask,deleteTask}