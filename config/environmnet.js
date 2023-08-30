/*
require ('dotenv').config
const path = require('path');
const express=require(`express`);

const app= express();
app.use(express.static(__dirname + '/'));

require('dotenv').config({path : `${__dirname}/.env`});
console.log('**************************************************')
// console.log(`${__dirname}/.env.${process.env.NODE_ENV}`)
console.log(path.resolve(process.cwd(), '.env'))
console.log('**************************************************')

*/

require('dotenv').config();
// console.log(process.env.ASSET_PATH);
// console.log(process.env)


const development = {
    name: 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db: 'codial_development',
    smtp: {     
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
      
          user: 'neffybathla',
          pass: 'wspkfdvddayybzen'
        }
      },
      google_client_id: '724719531315-si56oqqcivqovhhmoo7rhf1b76uoejms.apps.googleusercontent.com',
      google_client_secret : "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",
      google_call_back_url : "http://localhost:8000/users/auth/google/callback",
      jwt_secret : 'codeial',

}
// console.log('**************************************************')
// console.log(development.asset_path);
// console.log('**************************************************')


const production ={

    name: 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {     
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
      
          user: process.env.CODEIAL_GOOGLE_AUTH_USERNAME,
          pass: process.env.CODEIAL_GOOGLE_AUTH_PASS
        }
      },
      google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
      google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
      google_call_back_url : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
      jwt_secret : process.env.JWT_SECRET,



}



// module.exports = development;

module.exports= eval(process.env.NODE_ENV) == undefined? development : eval(process.env.CODEIAL_ENVIRONMENT);