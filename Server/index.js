const app = require("./app");
const {port,connectDB} = require("./DB/config");

app.listen(port,async ()=>{  
    await connectDB()
    console.log(`Your Server is running At http://127.0.0.1:3000`) 
})

