const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environmnet');

// tell passport to use a new stategy for google login
passport.use( new googleStrategy({
    clientID: env.google_client_id,
    clientSecret : env.google_client_secret,
    callbackURL : env.google_call_back_url,
},
    async function(accessToken , refreshToken , profile , done){
        try{
            let user= await User.findOne({email: profile.emails[0].value})

            // console.log(profile);
            if(user){
                // if found set this user as req.user
                // console.log(accessToken,'token');
                return done(null,user);
            }else{
                //  if not found , create the usrr and set it as req.user
                // console.log ('***************here***************');
              let createUser= await  User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                });
                return done(null,createUser);
            }

        }catch(err){
            console.log("error in creating user in google-strategy-passport", err);
            return;

        }


    })
);

module.exports= passport;

