//const { getConnection } = require('../database')
const Entreno = require('../models/entreno')
//const { v1 } = require('uuid')


const getEntrenos = async (req, res) => {
    const entrenos = await Entreno.find();
    //console.log(entrenos)
    //const entrenos = getConnection().get('entrenos').value();
    res.json(entrenos)
}


const getEntreno = async (req, res) => {
    const entreno = await Entreno.findById(req.params.id)
    res.json(entreno)
    //console.log('tarea pedida')
    //const entrenos = await Entreno.find()
    //const task = getConnection().get('entrenos').find({id: req.params.id}).value();
}

const createEntreno = async (req, res) => {
    const { titulo, descripcion, series } = req.body
    const newEntreno = new Entreno({
        titulo,
        descripcion,
        series
    })
    await newEntreno.save()
    //getConnection().get('entrenos').push(newEntreno).write()
    //console.log(newEntreno)
    res.json({ status: "Entreno Guardado" })
}

const updateEntreno = async (req, res) => {
    const result = await getConnection().get('entrenos').find({ id: req.params.id })
        .assign(req.body)
        .write()
    res.json(result)
}
const deleteEntreno = async (req, res) => {
    await Entreno.findByIdAndDelete(req.params.id)
    console.log('Entreno eliminado')
}
module.exports = {
    getEntrenos,
    getEntreno,
    createEntreno,
    updateEntreno,
    deleteEntreno
}