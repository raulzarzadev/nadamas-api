const low = require('lowdb')
const fileAsync = require('lowdb/adapters/FileAsync');

let db;

async function createConnection() {
    const adapter = new fileAsync('db.json');
    db = await low(adapter);
    db.defaults({tasks: []}).write()
}

const getConnection = () => db;

module.exports = {
    createConnection,
    getConnection
}