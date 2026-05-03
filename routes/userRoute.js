const express=require("express");
const router=express.Router();
const {register,login,checkUser}=require("../controller/userController")
const authmiddleware=require("../middleware/authmiddleware")


// register user
router.post("/register",register)



// login user
router.post("/login",login)


// check user
router.get("/check",authmiddleware,checkUser)

module.exports=router;