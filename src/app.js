const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

//connecting to db 



//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes
 
//app.use(require('./routes/task.routes'));
app.use('/api/entreno',require('./routes/entreno.routes'));


module.exports = app;