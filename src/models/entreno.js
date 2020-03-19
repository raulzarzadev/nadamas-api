const mongoose = require('mongoose');
const { Schema } = mongoose;

const EntrenoSchema = new Schema({
    titulo: { type: String },
    descripcion: { type: String },
    series: { type: Array }
});

module.exports = mongoose.model('Entreno', EntrenoSchema);