const express=require("express");
const router=express.Router();
const {register,login,checkUser}=require("../controller/userController")
const {allQuestion}=require("../controller/questionController")


router.get("/all-questions",allQuestion)

module.exports=router;