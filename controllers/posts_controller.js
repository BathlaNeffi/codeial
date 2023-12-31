const Post=require('../models/post');
const Comment=require('../models/comment');
const Like = require('../models/like');

module.exports.create= async (req,res) =>{

    try{
        let post= await Post.create({
        content:req.body.content,
        user: req.user._id
    });

    if(req.xhr){
         //  if we want to populate just the name of the user (we'll not want to send the passwpord in that API ), this is how we do it!
    
         post = await post.populate('user', 'name');

        /*
        post = await post
        .populate({
            path: "user",
            populate: {
               path: "name",
            }
         })
         */

        return res.status(200).json({
            data:{
                post: post
            },
            message: 'Post created!'
        });
    }
    req.flash('success', 'Post added Successfully');
        return res.redirect('back');

                    
    }


    
    catch(err){
        req.flash('error', err);

        console.log('error in creating a post', err); 
        return res.redirect('back');

    }
}


module.exports.destroy= async (req,res)=>{
    try{
        

        let post= await Post.findById(req.params.id)
        // .id means converting  object id to string
         if(post.user == req.user.id){
        
            // Change :: delete the associated likes for the post and all its comments likes too
            await Like.deleteMany({likeable: post , onModel: 'Post'}); // deleting likes on this post
            await Like.deleteMany({_id: {$in: post.comments}});   // deleting likes on the comments of this post

        
            post.deleteOne();

           const DeletedComments= await Comment.deleteMany({ post: req.params.id})

           if(req.xhr){
           
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post Deleted!!"
            })
           }
           if(DeletedComments){
            // console.log('comments also deleted', DeletedComments)
            req.flash('success', 'Post  and associated comments deleted!!');
                return res.redirect('back');
            };
        }
            else{
                req.flash('error','You can not deleted the Post!!');
                return res.redirect('back');
            }

    }
    catch(err){

        req.flash('error', err);
      
        console.log(err);
    }
}