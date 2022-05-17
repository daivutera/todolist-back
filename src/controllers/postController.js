const { ErrorCase, SuccessCase } = require('../helpers/helpers');
const { getPostsDb, addTodoDb } = require('../models/postsModel');

async function getPosts(req, res) {
  const userId = req.userId;
  const data = await getPostsDb(userId);
  if (data === false) {
    ErrorCase(res);
    return;
  }
  if (!data.length) {
    return ErrorCase(res, 'there are no any posts yet');
  }
  SuccessCase(res, data);
}
async function addTodo(req, res) {
  const userId = req.userId;
  const { description } = req.body;
  const data = await addTodoDb(userId, description);
  if (data === false) {
    ErrorCase(res);
    return;
  }
  SuccessCase(res, data);
}

module.exports = { getPosts, addTodo };
