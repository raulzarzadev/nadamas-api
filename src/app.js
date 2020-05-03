const express = require('express');
const morgan = require('morgan');
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = express();

//Settings
app.set('port', process.env.PORT || 3005)

//connecting to db

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes

app.use('/api/entrenos', require('./routes/entrenos.routes'));


//static files
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;