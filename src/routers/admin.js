const express = require('express');
const router = express.Router();

//const passport1 = require('./config/passport1');

const User = require('../models/user');
const Admin = require('../models/admin');
const Factura = require('../models/Factura')

const { isAuthenticated } = require('../helpers/out');

const passport = require('passport');

router.get('/compras/admin', (req, res) => {
    res.render('compras/admin');
});

// ADMIN
router.get('/users/signin-admin', (req, res) => {
    res.render('users/signin-admin');
});

router.post('/users/signin-admin', passport.authenticate('local', {
    successRedirect: '/compras/admin',
    failureRedirect: '/users/signin-admin',
    failureFlash: true
}));

router.get('/users/signup-admin', (req, res) => {
    res.render('users/signup-admin');
});

router.post('/users/signup-admin', async(req, res) => {
    const { name, email, password } = req.body;
    const errors = [];
    console.log(req.body)
    if (name.length <= 0) {
        errors.push({ text: 'Por favor ingrese un nombre' });
    }
    if (email.length <= 0) {
        errors.push({ text: 'Por favor ingrese un correo electrónico' });
    }
    if (password.length <= 0) {
        errors.push({ text: 'Por favor ingrese una contraseña' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe ser de más de 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup-admin', { errors, name, email, password });
    } else {
        const emailAdmin = await Admin.findOne({ email: email });
        if (emailAdmin) {
            req.flash('error_msg', 'Ya existe este correo electrónico');
            res.redirect('/users/signup-admin');
        }
        const newAdmin = new Admin({ name, email, password });
        newAdmin.password = await newAdmin.encryptPassword(password);
        await newAdmin.save();
        req.flash('success_msg', 'Registro Exitoso');
        res.redirect('/users/signin-admin');
    }
});

router.get('/usuarios', async(req, res) => {
    await User.find()
        .then(all_users => {
            const contexto = {
                users: all_users.map(documento => {
                    return {
                        _id: documento._id,
                        name: documento.name,
                        email: documento.email
                    }
                })
            }
            res.render('compras/usuarios', { users: contexto.users });
        })
});

router.get('/facturas', async(req, res) => {
    await Factura.find()
        .then(all_factur => {
            const contexto = {
                facts: all_factur.map(documento => {
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
            res.render('compras/facturas', { facts: contexto.facts });
        })
});

router.delete('/admin/delete/:id', isAuthenticated, async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Usuario eliminado satisfactoriamente');
    res.redirect('/usuarios');
});

router.delete('/factura/delete/:id', isAuthenticated, async(req, res) => {
    await Factura.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Factura eliminada satisfactoriamente');
    res.redirect('/facturas');
});

module.exports = router;