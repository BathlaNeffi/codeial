const Post=require('../models/post');
const User=require('../models/user');

module.exports.home=  async (req,res) =>{

    // return res.send('<h2>Hello welcome to home via router</h1>');
    // res.cookie('user_id', 12);
    // console.log(req.cookies); 

    try{
    
      const UserPost= await Post.find({})
      .populate('user')
      .populate( {
        path:'comments',
        populate:{
            path:'user'
        }});

     
       const users= await User.find({})
         if(users){
            return res.render('home',{
                title:"Codeial | Home",
                posts:UserPost,
                all_users: users
            })

        };

        
    
}
    catch(err){
        console.log(err);
        return

    }



    

    }


module.exports.anotherhome=function(req,res){
    return res.end('<H1>This is another home</H1>')
}


module.exports.saveProfile=function(req,res){

    return res.end('<H1>profile saved Sucessfully!!! :)</H1>')

}