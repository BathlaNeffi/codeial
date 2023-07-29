const express=require(`express`);
const cookieParser=require('cookie-parser');
const port ='8000';

const app=express();
const expresLayouts=require('express-ejs-layouts');
app.use(expresLayouts);
const db=require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));
// extract style and scripts for sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




app.use('/', require('./routes/index'));

// set up the view engine

app.set('view engine', 'ejs');

// app.set('views',path.join(__dirname,'views'));
app.set('views','./views')


app.listen(port,function(err){

    if(err){
        console.log(`Error in running the server: ${err}`);

    }
    
    console.log(`Server is running on port: ${port}`);
})