const mongoose = require('mongoose');
const { Schema } = mongoose;

const PredVentasSchema = new Schema({
    ventas1: { type: Number, required: true },
    monto_ventas: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    prediccion: { type: Number },
    user: { type: String }
});

module.exports = mongoose.model('Predecir_ventas', PredVentasSchema)