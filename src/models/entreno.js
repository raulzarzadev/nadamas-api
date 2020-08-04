const mongoose = require("mongoose");
const { Schema } = mongoose;

const EntrenoSchema = new Schema(
  {
    titulo: { type: String },
    descripcion: { type: String },
    series: { type: Array },
    intensidad: { type: String },
    restBetweenSeries: { type: Number },
    nivel: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entreno", EntrenoSchema);
