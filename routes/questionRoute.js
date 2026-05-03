const express=require("express");
const router=express.Router();
const {register,login,checkUser}=require("../controller/userController")


router.get("/all-questions",(req,res)=>{
  return res.send("all questions") 
})


module.exports=router;