const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config()

const app = express();

//Settings
app.set('port', process.env.PORT || 3001)

//connecting to db

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes

//app.use(require('./routes/task.routes'));
app.use('/api/entreno', require('./routes/entrenos.routes'));
app.use('/api/entreno', require('./routes/entreno.routes'))


module.exports = app;