const express=require("express");
const router=express.Router();

const {postAnswer,getAnswers}=require("../controller/answerController")
router.post("/:questionId",postAnswer)
router.get("/get/:questionId",getAnswers)

module.exports=router;