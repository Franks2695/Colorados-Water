const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Admin = require('../models/admin');

const { isAuthenticated } = require('../helpers/out');

const passport = require('passport');

router.get('/compras/users', (req, res) => {
    res.render('compras/middle-users');
});

// USUARIOS CLIENTES
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/productos',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async(req, res) => {
    const { name, email, password, password1 } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: 'Por favor ingrese un nombre' });
    }
    if (email.length <= 0) {
        errors.push({ text: 'Por favor ingrese un correo electrónico' });
    }
    if (password.length <= 0) {
        errors.push({ text: 'Por favor ingrese una contraseña' });
    }
    if (password1.length <= 0) {
        errors.push({ text: 'Por favor confirme la contraseña' });
    }
    if (password != password1) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe ser de más de 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, password1 });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'Ya existe este correo electrónico');
            res.redirect('/users/signup');
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registro Exitoso');
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/compras/users');
});

module.exports = router;