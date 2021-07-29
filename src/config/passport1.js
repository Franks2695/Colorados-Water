const passport1 = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin');

// ADMIN
passport1.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
        return done(null, false, { message: 'Este usuario no existe' });
    } else {
        const match = await admin.matchPassword(password);
        if (match) {
            return done(null, admin);
        } else {
            return done(null, false, { message: 'Contraseña Incorrecta' });
        }
    }
}));

passport1.serializeUser((admin, done) => {
    done(null, admin.id);
});

passport1.deserializeUser((id, done) => {
    Admin.findById(id, (err, admin) => {
        done(err, admin);
    });
});