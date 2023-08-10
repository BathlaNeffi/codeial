const Post=require('../models/post');
const Comment=require('../models/comment');

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


module.exports.destroy= async (req,res)=>{
    try{
        

        const post= await Post.findById(req.params.id)
        // .id means converting  object id to string
         if(post.user == req.user.id){
        
            post.deleteOne();

           const DeletedComments= await Comment.deleteMany({ post: req.params.id})
           if(DeletedComments){
            // console.log('comments also deleted', DeletedComments)
                return res.redirect('back');
            };
        }
            else{
                return res.redirect('back');
            }

    }
    catch(err){
      
        console.log(err);
    }
}