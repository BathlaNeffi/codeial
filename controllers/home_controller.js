module.exports.home= function(req,res){

    // return res.send('<h2>Hello welcome to home via router</h1>');

    return res.render('home',{
        title:"Hello"
    })

    }


module.exports.anotherhome=function(req,res){
    return res.end('<H1>This is another home</H1>')
}