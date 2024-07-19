const Todo = require('../models/Todos');

async function get_todo(req, res){
  try {
    const todos = await Todo.find({ user_id: req.userid });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ 
        msg:"Get todo me dikkat h...."
     });
  }
};

module.exports = { get_todo };