const mongoose = require('mongoose');
const { Schema } = mongoose;

const VentaSchema = new Schema({
    producto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Venta', VentaSchema)