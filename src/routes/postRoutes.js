const express = require('express');
const postRouter = express.Router();
const { validationTodos } = require('../middleware/joiValidation');
const postController = require('../controllers/postController');
const { validateToken } = require('../middleware/tokenValidation');

postRouter.get('/posts', validateToken, postController.getPosts);
postRouter.post(
  '/add-post',
  validateToken,
  validationTodos,
  postController.addTodo
);

module.exports = postRouter;
