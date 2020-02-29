const { getConnection } = require('../database')
const { v1 } = require('uuid')

const getEntrenos = (req, res) => {
    const entrenos = getConnection().get('entrenos').value();
    res.send(entrenos)
}

const getEntreno = (req, res) => {
    //const task = getConnection().get('entrenos').find({id: req.params.id}).value();
}

const createEntreno = (req, res) => {
    const newEntreno = {
        id: v1(),
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        series: req.body.series
    }
    getConnection().get('entrenos').push(newEntreno).write()
    console.log(newEntreno)
    res.json(newEntreno)
}

const updateEntreno = async (req, res) => {
    const result = await getConnection().get('entrenos').find({id: req.params.id})
    .assign(req.body)
    .write()
    res.json(result)
}

/* 

const getTasks = (req, res) => {
    const tasks = getConnection().get('tasks').value();
    res.json(tasks)
};

const getTask = (req, res) => {
    console.log(req.params.id)
    const task = getConnection().get('tasks').find({id: req.params.id}).value();
    res.json(task)
}

const createTask = (req, res) => {
    const newTask = {
        id: v4(),
        name: req.body.name,
        description: req.body.description
    }
    getConnection().get('tasks').push(newTask).write();
    console.log(newTask)
    res.send(newTask)
}

const updateTask = async (req, res) => {
    const result = await getConnection().get('tasks').find({id: req.params.id})
    .assign(req.body)
    .write()
    res.json(result)
}

const deleteTask = (req, res) => {
    const result = getConnection().get('tasks').remove({id: req.params.id}).write()
    res.json(result)
}


*/

module.exports = {
    getConnection,
    getEntrenos,
    getEntreno,
    createEntreno,
    updateEntreno
}