function guest(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return next();
    }

    res.render('users/dashboard', {name : "Alekh"});
}

module.exports = guest;