const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'No permitido, por favor inicie sesión primero');
    res.redirect('/compras/users');
};

module.exports = helpers;