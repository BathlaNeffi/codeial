module.exports.home= function(req,res){

    return res.send('<h2>Hello welcome to home via router</h1>');

    }


module.exports.profile=function(req,res){
    return res.end('<H1>This is profile page</H1>')
}