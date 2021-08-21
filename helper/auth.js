const authorize = (req, res, next) => {
    if(req.isAuthenticated()){
       return  next();
    };
    res.redirect('/');
};
const guestuser = (req, res, next ) => {
    if(req.isAuthenticated()){
        res.redirect('dashboard')
        return;
    }
    next()
}

module.exports = {
    authorize,
    guestuser
};