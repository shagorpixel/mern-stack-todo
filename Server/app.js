const express = require('express');
const taskRouter = require('./Router/task.router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/task',taskRouter)
app.use((req,res)=>{
    res.send('<h2>Wellcome To Our Website</h2>')
})
module.exports = app