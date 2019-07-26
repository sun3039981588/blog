var mongoose = require('./connection');

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    age:String,
    gender:String,
    headr:String,
});

var User = mongoose.model('user',userSchema);

module.exports = User;