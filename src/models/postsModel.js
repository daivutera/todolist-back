const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getPostsDb(userId) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM tasks WHERE user_id = ${mysql.escape(userId)}`;
    const [data] = await connection.execute(sql);
    await connection.close();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function addTodoDb(userId, description) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO tasks (user_id, description) VALUES(?,?)`;
    const [data] = await connection.execute(sql, [userId, description]);
    await connection.close();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { getPostsDb, addTodoDb };
