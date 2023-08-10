const User=require('../models/user');

module.exports.profile=async  (req,res) =>{
    try{
    const user= await User.findById(req.params.id);

    return res.render('user_profile',{
        title:'User profile',
        profile_user: user

    });


    // return res.end('<h1>This is users profile </h1>');
    }
    catch(err){
        console.log(err);
    }

}

module.exports.update= async (req,res)=>{
    try{
    if(req.user.id == req.params.id){

       const user= await User.findByIdAndUpdate(req.params.id, {name: req.body.name ,email: req.body.email});
       return res.redirect('back');
        } else{
            return res.satus(401).send('unauthorized');
        }

    }
    catch(err){
        console.log(err);
    }
}

// rendering the sign up page
module.exports.signUp= function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up'),{
        title: 'Codeial  Sign Up'
    }
}

//  rendering the sign in page

module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in'),{
        title: 'Codeial  Sign IN'
    }
}

// get signup data




/*

    module.exports.create= function(req,res){

        if(req.body.password!=req.body.confim_password){
            console.log('password and confim password doesnot match')
        return res.redirect('back');
        }

        User.findOne({email:req.body.email})

        .catch((err)=>{
            console.log('error in finding user in signing up'); return;
        })
        .then((user) =>{

            if(!user){
                User.create(req.body)
                .catch((err) =>{
                    console.log('Error in creating user even when user is not there');
                    return;
                })
                .then((user)=>{
                    return res.redirect('/users/sign-in');
                })
            } else{

                console.log('user already exits');
                return res.redirect('back');
            }

        })
    }

    */



    
module.exports.create= async (req,res) =>{

try {

    if(req.body.password!=req.body.confim_password){
        console.log('password and confim password doesnot match')
       return res.redirect('back');
    }

    const user= await User.findOne({email:req.body.email})
	
	

    

        if(!user){
                    const userCreated= await User.create(req.body)
					try{
						if(userCreated){
						return res.redirect('/users/sign-in');
						}
					}
					catch(error) {
						 console.log('Error in creating user even when user is not there');
						return;
					}
            
                
            } else{

            console.log('user already exits');
            return res.redirect('back');
        }
	}
	    catch(error){
        console.log('error in finding user in signing up'); return;
    }
}


// get sign In data and create the session 

module.exports.createSession=function(req,res){
    
    return res.redirect('/')
}



/*

module.exports.create = async (req, res) => {
    try{
        // 1-> fetch user details from the req.body object
        // const name = req.body.name;
        // const email = req.body.email;
        // const password = req.body.password;
        // const confirmPassword = req.body.confirmPassword;

        const { name, email, password, confim_password } = req.body;

        // 2-> validate password and confirm password are same or not
            // a-> if not then send failed response
            if(password !== confim_password){
                return res.status(400).json({
                    message: "Password and confirm password do not matched!",
                    data: {}
                });
            }

        // 3-> Check whether user exists for the email or not
        const existingUser = await User.findOne({email: email});
            // a-> if present then send failed response
            if(existingUser) {
                return res.status(400).json({
                    message: "Please signIn to use our platform!",
                    data: {}
                });
            }
        
        // 4-> Store user information in the User Model
        const user = await User.create(req.body
        );

        // 5-> Send success response
        return res.status(200).json({
            message: "Successfully created the user account!",
            data: {
                user,
            }
        })
    }catch(error){
        // error handling
        return res.status(500).json({
            message: "Opps something went wrong at the server!",
            data: {
                error,
            }
        })
    }
}
*/


module.exports.destroySession =function(req,res){
   req.logout( function(err){
    console.log(err);
   });

    return res.redirect('/');
}