/*Factory Method
Returning a object from a function
*/

const path = require('path');

function homeController(req,res)
{
    return{
        index : function(req,res)
        {
            res.sendFile(path.join(__dirname,'../../../') + '/public/html/index.html');
        },
        dashboard : function(req,res)
        {
            res.render('users/dashboard');
        }
    }
}

module.exports=homeController;