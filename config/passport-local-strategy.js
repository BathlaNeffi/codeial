const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const user=require('../models/user');
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email'
    },
     async function(email, password, done){
        try{
        // find the user and establish the identity
        const user=await User.findOne({email: email}) 
            
               if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null,false);
               }
               
                return done(null,user);
               

            }
            catch(err){
                console.log('Error in finding user-----> Passport');
                return done(err);

            }
        }
    ));


    //  serializing the user to decide wich key is yo be kept in the coookies

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });


    //  deserialize the user from the key in the cookies

 passport.deserializeUser( async  (id,done) => {
    try{

        const user= await User.findById(id)
        
            return done(null,user);

    }
        catch(err){
            console.log('Error in finding user-----> Passport');
                return done(err);

        }
    

    });


    //  check if the user is authenticated

     passport.checkAuthentication=function(req,res,next){
        // if the user is signed in then pass the request to the next function(controller's action)
        if(req.isAuthenticated()){
            return next();
        }
        //  if the user is not signed in
        return res.redirect('/users/sign-in');
     }


    passport.setAuthenticateUser = function(req,res,next){
        if(req.isAuthenticated()){
            //  req.user contains  the current signed in user from the session cookie and we are just sending this to the locals for the views
            res.locals.user = req.user;
           
        }
        return next();
    }


module.exports=passport;