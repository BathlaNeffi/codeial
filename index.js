const express=require(`express`);
const cookieParser=require('cookie-parser');
const port ='8000';
const env = require('./config/environmnet');
const logger = require('morgan');
// require('dotenv').config();
// console.log(process.env.ASSET_PATH)

const app=express();
const expresLayouts=require('express-ejs-layouts');
app.use(expresLayouts);
const db=require('./config/mongoose');
// used for session cookies
const session=require('express-session');

const passport=require('passport');

const LocalStrategy= require('./config/passport-local-strategy');
const passportJWT= require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const MongoStore= require('connect-mongo');
// const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const flash =require('connect-flash');
const customMware=require('./config/middleware');
//  setup the chat server  to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);


  chatServer.listen(5000);
console.log('chat server is listening on port 5000');



// app.use(sassMiddleware({
   
//     // src: __dirname,
//     // dest: path.join(__dirname, './assets/css'),
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix:  '/css'  
//     // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
// }));



app.use(express.urlencoded());


//  make the upload path avaliable to the browser

app.use('/uploads', express.static(__dirname +'/uploads'));



app.use(cookieParser());


app.use(logger(env.morgan.mode, env.morgan.options) )




app.use(express.static(env.asset_path));
// extract style and scripts for sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);






// set up the view engine

app.set('view engine', 'ejs');

// app.set('views',path.join(__dirname,'views'));
app.set('views','./views')
//  mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',

    // To do chnage the secret before deployment in production mode

    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : MongoStore.create (
        {
        mongoUrl: 'mongodb://127.0.0.1:27017/codial_development',
        autoRemove: 'disable'
        },
    function(err){
        console.log(err || 'connected-mongodb setup ok');
    }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateUser);
app.use(flash());
app.use(customMware.setFlash);

//  use express router
app.use('/', require('./routes/index'));


app.listen(port,function(err){

    if(err){
        console.log(`Error in running the server: ${err}`);

    }
    
    console.log(`Server is running on port: ${port}`);
})