const authController = require('../app/http/controllers/authController');
const createNoteController = require('../app/http/controllers/createNoteController');
const homeController =require('../app/http/controllers/homeController');
const showNoteController = require('../app/http/controllers/showNoteController');
const guest = require('../app/http/middlwares/guest')

function initRoutes(app)
{
    app.get('/' , homeController().index);
    app.get('/login',guest ,authController().login);
    app.get('/register',guest ,authController().register);
    app.get('/index.html',homeController().index);
    app.get('/dashboard',homeController().dashboard);
    app.get('/createNote',createNoteController().index);
    app.get('/showNotes',showNoteController().index);
    app.post('/createNote',createNoteController().postIndex);
    app.post('/postregister',authController().postRegister);
    app.post('/login',authController().postLogin);
    app.post('/logout',authController().logout);
}

module.exports = initRoutes;