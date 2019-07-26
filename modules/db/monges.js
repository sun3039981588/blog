var mongoose = require('./connection')


var msgSchema = new mongoose.Schema({
    headline:String,
    label:[],
    time:Object,
    count:Number,
    content:String,
    replys:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'reply'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});


var Mosge = mongoose.model('message',msgSchema);

module.exports = Mosge;
