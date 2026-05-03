const statuscodes=require("http-status-codes")
const jwt=require("jsonwebtoken")
async function authmiddleware(req,res,next){
  const authHeader=req.headers.authorization
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(statuscodes.UNAUTHORIZED).json({msg:"authentication invalid"})
  }
  const token = authHeader.split(" ")[1]
    //  console.log(authHeader)
    //  console.log(token)
  try {
    const {userName,userid}= jwt.verify(token,"secret")
    req.user = {userName,userid}
    next()
  } catch (error) {
    
    return res.status(statuscodes.UNAUTHORIZED).json({msg:"authentication invalid"})
  }
}
module.exports=authmiddleware