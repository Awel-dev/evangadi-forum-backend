
const dbConnection=require("../db/dbConfig")
const  bcrypt=require('bcrypt')
const statusCodes=require("http-status-codes")
const jwt=require("jsonwebtoken")
const authmiddleware=require("../middleware/authmiddleware")

async function register(req,res){
 const {userName, firstName, lastName, email, password }=req.body
 if(!email || !password || !firstName || !userName || !lastName){
    return res.status(statusCodes.BAD_REQUEST).json({msg:"please provide all the reqiured information"})
}

try{

    const [user]= await dbConnection.query("select userName, userid from users where  email=?", [email])
    if(user.length>0){
     return res.status(statusCodes.BAD_REQUEST).json({msg:"already registered"})
    }

    if(password.length<=8){
      return res.status(statusCodes.BAD_REQUEST).json({msg:"password must be at least 8 characters"})
    }
     const salt=await bcrypt.genSalt(10)

     const hashedPassword= await bcrypt.hash(password,salt)

await dbConnection.query("INSERT INTO users (userName, firstName, lastname, email, password) VALUES (?,?,?,?,?)",
    [userName, firstName, lastName, email, hashedPassword] )
    return res.status(statusCodes.CREATED).json({msg:"user created"})
} catch(error){
 console.log(error.message)
 return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong, try again later"})
}
}

async function login(req,res){
const {email, password}=req.body
if(!email || !password){
    return res.status(statusCodes.BAD_REQUEST).json({msg:"please enter all the required fields"})
}

try{
const [user]=await dbConnection.query("select userName, userid, password from users where email=? ",[email])
 if(user.length==0){
    return res.status(statusCodes.BAD_REQUEST).json({msg:"invalid credential"})
 }
 const isMatch=await bcrypt.compare(password,user[0].password)
 if(!isMatch){
    return res.status(statusCodes.BAD_REQUEST).json({msg:"invalid credential"})
 }

 const userName=user[0].userName;
 const userid=user[0].userid
const token=jwt.sign({userName,userid},"secret",{expiresIn:"1d"})
return res.status(statusCodes.OK).json({msg:"user login seccesful!",token})

}catch(error){
 console.log(error.message)
 return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong, try again later"})
}

}


async function checkUser(req,res){
    const userName=req.user.userName;
    const userid=req.user.userid;
 return res.status(statusCodes.OK).json({msg:"valid user",userName,userid})
}


module.exports={register,login,checkUser}