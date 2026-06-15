const dbConnection=require("../db/dbConfig")
const { v4: uuidv4 } = require("uuid");

async function allQuestion(req,res){
    try {
      const [questions]= await dbConnection.query(`SELECT 
        q.questionid,
        q.title,
        q.description,
        u.username,
        count(a.answerid) AS answer_count from questions q JOIN users u ON q.userid=u.userid LEFT JOIN answers a ON q.questionid=a.questionid 
        GROUP BY q.questionid,u.username;
        `);
        res.status(200).json({
            msg:"success",
            questions
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



async function askQuestion(req, res) {
  try {

    const { title, description } = req.body;

    const userid = req.user.userid;

    if (!title || !description) {
      return res.status(400).json({
        msg: "Please provide all fields"
      });
    }

    const questionid = uuidv4();

    await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)",
      [questionid, userid, title, description]
    );

    res.status(201).json({
      msg: "Question posted successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  } 
}


async function SingleQuestion(req, res) {
  try {
    const { questionid } = req.params;

    const [question] = await dbConnection.query(`
      SELECT 
        q.questionid,
        q.title,
        q.description,
        u.username
      FROM questions q
      JOIN users u
        ON q.userid = u.userid
      WHERE q.questionid = ?`
    , [questionid]);

    res.status(200).json({
      msg: "success",
      question: question[0]
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports={allQuestion, askQuestion, singleQuestion: SingleQuestion};