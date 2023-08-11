const Comment=require('../models/comment');
const Post=require('../models/post');



module.exports.create= async (req,res)=>{
    try{
         const post= await Post.findById(req.body.post);
         if(post){
             const comment= await Comment.create({
                content: req.body.content,
                post:req.body.post,
                user: req.user._id,
            });
            
                post.comments.push(comment);
                post.save();
                req.flash('success', 'Comment added Successfully');
                res.redirect('/');
            
         }
         

         

    }
    catch(err){
        console.log(err);

    }
}


module.exports.destroy= async (req,res)=>{

    try{
         
        const comment= await Comment.findById(req.params.id);
       
        let postId=comment.post;
        const post= await Post.findById(postId);
        
        // console.log('comment.user ' , comment.user ,'req.user.id',req.user.id);
        // console.log('post.user ' , post.user ,'req.user.id',req.user.id);
        if( post.user == req.user.id   || comment.user == req.user.id  ){
            


            comment.deleteOne();
            await Post.findByIdAndUpdate( postId , { $pull: {comments: req.params.id}});
            req.flash('success', 'Comment deleted!!');
            return res.redirect('back');


        }else{
            req.flash('error', 'Uauthrorized');
            // console.log('err in delteing comment')
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
    }

}