require('dotenv').config()
const express=require("express");
const app=express();
const port=5500
const authmiddleware=require("./middleware/authmiddleware")
const cors=require("cors")
app.use(cors())

const dbConnection=require("./db/dbConfig")
app.use(express.json())

// user route middleware
const userRoute=require("./routes/userRoute")
app.use("/api/users", userRoute)

const questionRoute=require("./routes/questionRoute")
app.use("/api/questions",authmiddleware,questionRoute)

async function start() {
try{
const result=await dbConnection.execute("select 'test' ")
 await  app.listen(port)
console.log("database connection established")
console.log(`listening on ${port}`)
} catch(error){console.log(error.message)}
}
start()



