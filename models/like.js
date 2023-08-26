const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    // This Defines the object id of  the liked object
    likeable :{
        type: mongoose.Schema.ObjectId,
        require : true,
        refPath: 'onModel'
    },
    // This field is used for  defining the type  of the liked object since this is a dynamic reference 
    onModel :{
        type: String,
        require: true,
        enum: ['Post', 'Comment']
    }

 }, {
        timestamps: true
    

});

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like;

