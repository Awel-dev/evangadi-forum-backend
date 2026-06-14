const dbConnection=require("../db/dbConfig")
async function allQuestion(req,res){
    try {
      const [questions]= await dbConnection.query(`SELECT 
        q.questionid,
        q.title,
        q.description,
        q.created_at,
        u.username,
        count(a.answerid) AS answer_count from questions q JOIN users u ON q.userid=u.userid LEFT JOIN answers a ON q.questionid=a.questionid 
        GROUP BY q.questionid,u.username
        ORDER BY q.created_at DESC;
        `);
        res.status(200).json({
            msg:"success",
            questions
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={allQuestion};