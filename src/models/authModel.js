const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function userLoginDb(email) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM users WHERE email = ${mysql.escape(
      email
    )} LIMIT 1`;
    const [data] = await connection.execute(sql);
    await connection.close();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function userRegisterDb(email, password) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql1 = `SELECT * FROM users WHERE email=(${mysql.escape(email)})`;
    const [data1] = await connection.execute(sql1);
    if (data1.length) {
      return {
        msg: 'there is such user',
      };
    }
    const sql = 'INSERT INTO users (email, password) VALUES (?,?)';
    const [data] = await connection.execute(sql, [email, password]);
    await connection.close();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = { userLoginDb, userRegisterDb };
