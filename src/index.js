const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const authRouter = require('./routes/authRoutes');
const serverPort = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  return res.send({ msg: 'Server is running' });
});

app.use('/auth/', authRouter);

app.all('*', (req, res) => {
  return res.status(404).send({ err: 'Page not found' });
});

app.listen(serverPort, () =>
  console.log(`Server is running on port ${serverPort}`)
);
