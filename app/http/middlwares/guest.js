const passport = require('passport')
const User = require('../../models/user')

function guest(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return next();
    }
    objId = req.session.passport.user
    User.findOne({ _id: objId }).then((data) => {
        console.log(data.name);
        return data.name;
    
    }).then((name) => {
        console.log(name);
        res.render("users/dashboard", { name : name })
    })
}

module.exports = guest;