const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desCription:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const Tasks = mongoose.model('tasks',taskSchema);
module.exports = Tasks;