"use strict";
const nodemailer = require("nodemailer");
const ejs= require('ejs');
const path = require('path');
const env = require('./environmnet');


const transporter = nodemailer.createTransport(env.smtp);

    let renderTemplate = async (data, relativePath) =>{
        try{
            let mainHTML;
            let template= await ejs.renderFile(
                            path.join(__dirname,'../views/mailers', relativePath),
                            data,
                            )
            mainHTML=template;
            return mainHTML;

            

        }catch(err){
            console.log('error in rendering template', err);
            return;

        }

    }

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}