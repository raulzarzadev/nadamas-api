//const { getConnection } = require('../database')
const Entreno = require('../models/entreno')
//const { v1 } = require('uuid')


const getEntrenos = async (req, res) => {
    const entrenos = await Entreno.find();
    console.log(entrenos)

    //const entrenos = getConnection().get('entrenos').value();
    res.json(entrenos)
}


const getEntreno = async (req, res) => {
    const entreno = await Entreno.findById(req.params.id)
    res.json(entreno)
    console.log('tarea pedida')
    //const entrenos = await Entreno.find()
    //const task = getConnection().get('entrenos').find({id: req.params.id}).value();
}

const createEntreno = async(req, res) => {
    const {titulo, descripcion, series} = req.body
    const newEntreno = new Entreno({
        titulo,
        descripcion,
        series
    })
    await newEntreno.save()
    //getConnection().get('entrenos').push(newEntreno).write()
    console.log(newEntreno)
    res.json({status: "Entreno Guardado"})
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
    getEntrenos,
    getEntreno,
    createEntreno,
    updateEntreno
}