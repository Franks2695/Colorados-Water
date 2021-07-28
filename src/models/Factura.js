const mongoose = require('mongoose');
const { Schema } = mongoose;

const FacturaSchema = new Schema({
    nombre: { type: String, required: true },
    cedula: { type: Number, required: true },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    total: { type: Number },
    fecha: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = mongoose.model('Factura', FacturaSchema)