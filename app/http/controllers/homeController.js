/*Factory Method
Returning a object from a function
*/

const path = require('path');
const User = require('../../models/user');
const passport = require('passport');

function homeController(req,res)
{
    return{
        index : function(req,res)
        {
            res.sendFile(path.join(__dirname,'../../../') + '/public/html/index.html');
        },
        dashboard : function(req,res)
        {
            objId = req.session.passport.user
            User.findOne({ _id: objId }).then((data) => {
                return data.name;
            
            }).then((name) => {
                console.log(name);
                res.render("users/dashboard", { name })
            })
        }
    }
}

module.exports=homeController;