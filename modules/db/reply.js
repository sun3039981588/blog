var mongoose = require('./connection')



var relSchema = new mongoose.Schema({
     username:String,
     contene:String,
     time:String,
});





var Reply = mongoose.model('reply',relSchema);

module.exports = Reply;

