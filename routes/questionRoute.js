const express=require("express");
const router=express.Router();

const {allQuestion, askQuestion,singleQuestion}=require("../controller/questionController")


router.get("/all-questions",allQuestion)
router.get("/:questionid",singleQuestion)
router.post("/ask",askQuestion)

module.exports=router;