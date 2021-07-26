const mongoose = require('mongoose');
const { Schema } = mongoose;

const PredComprasSchema = new Schema({
    ventas2: { type: Number, required: true },
    monto_compras: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    prediccion: { type: Number },
    user: { type: String }
});

module.exports = mongoose.model('Predecir_compras', PredComprasSchema)