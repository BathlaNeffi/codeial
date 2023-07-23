module.exports.profile=function(req,res){

    return res.render('user_profile',{
        title:'profile'

    })

    // return res.end('<h1>This is users profile </h1>');
}