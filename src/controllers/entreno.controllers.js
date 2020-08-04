//const { getConnection } = require('../database')
const Entreno = require("../models/entreno");
//const { v1 } = require('uuid')

const getEntrenos = async (req, res) => {
  const entrenos = await Entreno.find();
  //console.log(entrenos)
  //const entrenos = getConnection().get('entrenos').value();
  res.json(entrenos);
};

const getEntreno = async (req, res) => {
  const entreno = await Entreno.findById(req.params.id);
  console.log(entreno);

  res.json(entreno);
  //const entrenos = await Entreno.find()
  //const task = getConnection().get('entrenos').find({id: req.params.id}).value();
};

const createEntreno = async (req, res) => {
  const {
    titulo,
    descripcion,
    series,
    nivel,
    intensidad,
    restBetweenSeries,
  } = req.body;

  const newEntreno = new Entreno({
    titulo,
    descripcion,
    series,
    nivel,
    intensidad,
    restBetweenSeries,
  });
  console.log(req.body);
  await newEntreno.save();
  //getConnection().get('entrenos').push(newEntreno).write()
  //console.log(newEntreno)
  res.json({ status: "Entreno Guardado", newEntreno });
};

const updateEntreno = async (req, res) => {
  try {
    await Entreno.findByIdAndUpdate(req.params.id, req.body);
    console.log("updated", req.body);
  } catch (error) {
    console.log(error);
  }
};
const deleteEntreno = async (req, res) => {
  await Entreno.findByIdAndDelete(req.params.id);
  console.log("Entreno eliminado");
};
module.exports = {
  getEntrenos,
  getEntreno,
  createEntreno,
  updateEntreno,
  deleteEntreno,
};
