const Post=require('../models/post');

module.exports.create= async (req,res) =>{

    try{
        const postCreated =await Post.create({
        content:req.body.content,
        user: req.user._id
    });
    if(postCreated){
        return res.redirect('back');

                    }
    }


    
    catch(err){
        console.log('error in creating a post'); return;

    }
    
    

    
  

        

                    
    
    
}