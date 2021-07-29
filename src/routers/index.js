const express = require('express');
const router = express.Router();

const Predecir_ventas = require('../models/Predecir-ventas')
const Predecir_compras = require('../models/Predecir-compras')

const { isAuthenticated } = require('../helpers/out');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/productos', (req, res) => {
    res.render('compras/Bienvenida');
});

router.get('/proveedor', (req, res) => {
    res.render('compras/proveedor');
});

router.get('/productos-fuera', (req, res) => {
    res.render('compras/productos');
});

router.get('/compras/predict', isAuthenticated, (req, res) => {
    res.render('compras/middle-pred');
});

router.get('/compras/predicts', isAuthenticated, (req, res) => {
    res.render('compras/prediccion_ventas');
});

router.post('/compras/prediccion_ventas', isAuthenticated, async(req, res) => {
    const { ventas1, monto_ventas, prediccion } = req.body;
    const errors = [];

    if (!ventas1) {
        errors.push({ text: 'Por favor ingrese un número de ventas' });
    }
    if (!monto_ventas) {
        errors.push({ text: 'Por favor ingrese un monto de ventas' });
    }
    if (errors.length > 0) {
        res.render('compras/prediccion_ventas', {
            errors,
            ventas1,
            monto_ventas,
            prediccion
        });
    } else {
        const red = (parseFloat(ventas1) + parseFloat(monto_ventas)) / 2.6412;
        const prediccion = red.toFixed(2);
        const newPrediccion_ventas = new Predecir_ventas({ ventas1, monto_ventas, prediccion });
        newPrediccion_ventas.user = req.user.id;
        await newPrediccion_ventas.save();
        res.redirect('/prediccion_ventas');
    }

});

router.get('/prediccion_ventas', isAuthenticated, async(req, res) => {
    await Predecir_ventas.find({ user: req.user.id })
        .then(all_predicts => {
            const contexto = {
                predicciones_ventas: all_predicts.map(documento => {
                    return {
                        _id: documento._id,
                        ventas1: documento.ventas1,
                        monto_ventas: documento.monto_ventas,
                        prediccion: documento.prediccion
                    }
                })
            }
            res.render('compras/predicts-ventas-full', { predicciones_ventas: contexto.predicciones_ventas });
        })
});

router.get('/compras/predict_compras', isAuthenticated, (req, res) => {
    res.render('compras/prediccion_compras');
});

router.post('/compras/prediccion_compras', isAuthenticated, async(req, res) => {
    const { ventas2, monto_compras, prediccion } = req.body;
    const errors = [];

    if (!ventas2) {
        errors.push({ text: 'Por favor ingrese una número de ventas' });
    }
    if (!monto_compras) {
        errors.push({ text: 'Por favor ingrese un monto de compras' });
    }
    if (errors.length > 0) {
        res.render('compras/prediccion_compras', {
            errors,
            ventas2,
            monto_compras,
            prediccion
        });
    } else {
        const red1 = (parseFloat(ventas2) + parseFloat(monto_compras)) / 2.644;
        const prediccion = red1.toFixed(2);
        const newPrediccion_compras = new Predecir_compras({ ventas2, monto_compras, prediccion });
        newPrediccion_compras.user = req.user.id;
        await newPrediccion_compras.save();
        req.flash('success_msg', 'Todos los datos fueron aceptados')
        res.redirect('/prediccion_compras');
    }

});

router.get('/prediccion_compras', isAuthenticated, async(req, res) => {
    await Predecir_compras.find({ user: req.user.id })
        .then(all_predicts => {
            const contexto = {
                predicciones_compras: all_predicts.map(documento => {
                    return {
                        _id: documento._id,
                        ventas2: documento.ventas2,
                        monto_compras: documento.monto_compras,
                        prediccion: documento.prediccion
                    }
                })
            }
            res.render('compras/predicts-compras-full', { predicciones_compras: contexto.predicciones_compras });
        })
});

router.delete('/ventas/delete/:id', isAuthenticated, async(req, res) => {
    await Predecir_ventas.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Predicción de ventas eliminada satisfactoriamente');
    res.redirect('/prediccion_ventas');
});

router.delete('/compras1/delete/:id', isAuthenticated, async(req, res) => {
    await Predecir_compras.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Predicción de compras eliminada satisfactoriamente');
    res.redirect('/prediccion_compras');
});

module.exports = router;