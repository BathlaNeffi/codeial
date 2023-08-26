const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer= require('../mailers/comments_mailer');
const queue= require('../config/kue');
const commentEmailWorker= require('../workers/comment_email_worker');
const Like = require('../models/like');




module.exports.create= async (req,res)=>{
    try{
         const post= await Post.findById(req.body.post);
         if(post){
             let comment= await Comment.create({
                content: req.body.content,
                post:req.body.post,
                user: req.user._id,
            });
            
                post.comments.push(comment);
                post.save();

                commnet = await comment.populate('user', 'name email');
                // comment = await comment
                //         .populate({
                //             path: "user",
                //             populate: {
                //             path: "name",
                //             }
                //         });

// commentsMailer.newCommnet(comment);
                let job = await queue.create('emails', comment).save(
                    function(err){
                        if(err){
                        console.log('Errror', err);
                        return;
                        }
                        console.log('job equeued', job.id);

                    });

               

                        
                if(req.xhr){
                    //  Simillar fo comments to fetch the user's id!!
                    

                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Comment Created!!"
                    });


                }
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
            
            //  CHANGE :: destory the associated  likes for this comment
            await Like.deleteMany({likeable: comment._id , onModel : 'Comment'})

            comment.deleteOne();
           let post= await Post.findByIdAndUpdate( postId , { $pull: {comments: req.params.id}});
        //    send the commment id which  was deleted back to the views
        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment_id : req.params.id
                },
                message: "Comment Deleted!!"
            });
        }
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