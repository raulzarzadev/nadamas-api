const mongoose = require('mongoose');
const { Schema } = mongoose;

const EntrenoSchema = new Schema({
    titulo: { type: String },
    descripcion: { type: String },
    series: { type: Array }
},{
    timestamps: true
});

module.exports = mongoose.model('Entreno', EntrenoSchema);