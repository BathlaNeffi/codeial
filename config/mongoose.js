const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codial_development');

const db=mongoose.connection;

db.on('err' , console.error.bind(console,'Error in connecting to MOngoBD'));

db.once('open', ()=>{
    console.log('connected to database:: MONGODB');
})