const app = require('./app');
const {mongoose} = require('./database')

//const { createConnection } = require('./database');

//createConnection()

app.listen(3001)

console.log('server on port', 3001)