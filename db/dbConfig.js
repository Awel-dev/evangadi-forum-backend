const mysql2= require("mysql2");

const dbConnection=mysql2.createPool(
    {  user:"evangadi-admin",
        database:"evangadi_db",
        host:"localhost",
        password:"12345678",
        port:8889,
        connectionLimit:10,

    }
)
// console.log("i stated")
// dbConnection.execute("select 'test' ",(err,result)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//    console.log(result)
//     }
// })

// console.log("final")
module.exports=dbConnection.promise();