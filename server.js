require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session')
const mongoose = require('mongoose');
const mainRouter = require('./routes/web');
const port = process.env.PORT || 3000;
const flash =require('express-flash');
const MongoDbStore = require('connect-mongo')
const passport = require('passport')


//Middleware
app.use(express.static('public'));

//middlewareforpost
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(flash());

//global middlewares
app.use((req,res,next)=>
{
    res.locals.session = req.session;
    res.locals.user= req.user
    next()
});

//mongoDB connnection
const url = 'mongodb://localhost/NotesApp';
mongoose.connect(url,{
    useNewURLParser:true,
});

const connection = mongoose.connection
connection.once('open',()=>
{
    console.log("Database connected");
}).on('err',()=>{
    console.log("Database not connected");
})


//mongosessionsetup
// let mongoStore = new MongoDbStore(
//     {
//         mongooseConnection: connection,
//         collection:'sessions'
//     });



//sessionconfig
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store:MongoDbStore.create({
        mongoUrl:url,
        collection:'sessions'
    }),
    saveUninitialized:false,
    cookie:{maxAge: 1000 * 60 * 60 * 24}

}))

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//ejs setup
app.set('view engine','ejs');
console.log(app.get('views'));

//Router
mainRouter(app);

app.listen(port,()=>{
    console.log(`Listening to port :${port}`);
});
