const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/productos', (req, res) => {
    res.render('compras/Bienvenida');
});

router.get('/prediccion', (req, res) => {
    res.render('compras/Bienvenida');
});

module.exports = router;