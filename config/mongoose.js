const mongoose=require('mongoose');
const env = require('../config/environmnet');

mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

const db=mongoose.connection;

db.on('err' , console.error.bind(console,'Error in connecting to MOngoBD'));

db.once('open', ()=>{
    console.log('connected to database:: MONGODB');
})