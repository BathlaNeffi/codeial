const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method


exports.newCommnet =  async (comment) =>{

    try{
        let htmlString= await  nodeMailer.renderTemplate({comment : comment}, 'comments/new_comment.ejs')
    // console.log('inside the newComment mailer', comment);

    const info = await nodeMailer.transporter.sendMail({
        from: 'neffybathla@gmail.com', // sender address
        to: `${comment.user.email},neffycoolguy@gmail.com ` , // list of receivers
        subject: "Hello ✔ New Comment Pubblished", // Subject line
        text: `new comment Published!!, ${comment.content} `, // plain text body
        html: htmlString,
        // "<h1>Yup your comment  is now  published </h1>", // html body
        envelope: {
            from: 'neffybathla@gmail.com',
            to: 'neha37661@gmail.com'
        },

      });

     if(info){
        console.log("Message sent: %s", info.messageId);

     } 
      return;

    }catch(err){
        console.log('Error in  sending mail', err);
        return;
        
    }
}