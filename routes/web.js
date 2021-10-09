const authController = require('../app/http/controllers/authController');
const createNoteController = require('../app/http/controllers/createNoteController');
const homeController =require('../app/http/controllers/homeController');
const showNoteController = require('../app/http/controllers/showNoteController');
const searchController = require('../app/http/controllers/searchController');
const guest = require('../app/http/middlwares/guest')
const userCheck= require('../app/http/middlwares/userCheck');

function initRoutes(app)
{
    app.get('/' , homeController().index);
    app.get('/login',guest ,authController().login);
    app.get('/register',guest ,authController().register);
    app.get('/index.html',homeController().index);
    app.get('/dashboard',userCheck,homeController().dashboard);
    app.get('/createNote',userCheck ,createNoteController().index);
    app.get('/showNotes',userCheck,showNoteController().index);
    app.post('/createNote',createNoteController().postIndex);
    app.post('/postregister',authController().postRegister);
    app.post('/login',authController().postLogin);
    app.post('/logout',authController().logout);
    app.get('/searchNotes',searchController().index)
    app.post('/searchNotes',searchController().postSearch)
}

module.exports = initRoutes;