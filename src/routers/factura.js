const express = require('express');
const router = express.Router();

const Factura = require('../models/Factura')

const { isAuthenticated } = require('../helpers/out');

router.get('/compras/Factura', isAuthenticated, (req, res) => {
    res.render('compras/facturacion');
});

router.post('/compras/facturacion', isAuthenticated, async(req, res) => {
    const { nombre, cedula, direccion, telefono, cantidad, fecha, total, producto } = req.body;
    const errors = [];

    if (!nombre) {
        errors.push({ text: 'Por favor ingrese un nombre' });
    }
    if (!cedula) {
        errors.push({ text: 'Por favor ingrese un número de cédula' });
    }
    if (!direccion) {
        errors.push({ text: 'Por favor ingrese una dirección' });
    }
    if (!telefono) {
        errors.push({ text: 'Por favor ingrese un numero de teléfono' });
    }
    if (!cantidad) {
        errors.push({ text: 'Por favor ingrese la cantidad de productos a comprar' });
    }
    if (errors.length > 0) {
        res.render('compras/facturacion', {
            errors,
            nombre,
            cedula,
            direccion,
            telefono,
            cantidad,
            fecha,
            total,
            producto
        });
    } else {
        const red = parseInt(cantidad) * 0.50;
        const total = red.toFixed(2);
        const newFactura = new Factura({ nombre, cedula, direccion, telefono, cantidad, fecha, total, producto });
        newFactura.user = req.user.id;
        await newFactura.save();
        req.flash('success_msg', 'Todos los datos fueron aceptados')
        res.redirect('/compras');
    }

});

router.get('/compras', isAuthenticated, async(req, res) => {
    await Factura.find({ user: req.user.id })
        .then(all_facturas => {
            const contexto = {
                facturas: all_facturas.map(documento => {
                    return {
                        _id: documento._id,
                        nombre: documento.nombre,
                        cedula: documento.cedula,
                        direccion: documento.direccion,
                        telefono: documento.telefono,
                        cantidad: documento.cantidad,
                        fecha: documento.fecha,
                        total: documento.total,
                        producto: documento.producto
                    }
                })
            }
            res.render('compras/facturas-full', { facturas: contexto.facturas });
        })
});

router.get('/compras/edit/:id', isAuthenticated, async(req, res) => {
    const factura = await Factura.findById(req.params.id);
    res.render('compras/editar-factura', { factura })
});

router.put('/compras/editar-factura/:id', isAuthenticated, async(req, res) => {
    const { nombre, cedula, direccion, telefono } = req.body;
    await Factura.findByIdAndUpdate(req.params.id, { nombre, cedula, direccion, telefono });
    req.flash('success_msg', 'Factura actualizada satisfactoriamente');
    res.redirect('/compras');
});

router.delete('/compras/delete/:id', isAuthenticated, async(req, res) => {
    await Factura.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Factura eliminada satisfactoriamente');
    res.redirect('/compras');
});

module.exports = router;