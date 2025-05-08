const Tasks = require("../Model/Tasks");

const createTask = async (req,res)=>{
    try{
        const newTask = new Tasks(req.body);
        await newTask.save();
        res.status(201).json({
            message:"Data Created Successfully",
            data:newTask
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {createTask}