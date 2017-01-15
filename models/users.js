let moongose = require('mongoose');
let bcrypt = require('bcryptjs');



// user schemas
let UserSchema = moongose.Schema({

    username:{
        type:String,
        index:true
    },
     password:{
        type:String
    },
     email:{
        type:String
    },
     name:{
        type:String
    }
}); 

let User = module.exports = moongose.model('User', UserSchema);

module.exports.createUser = function(newUser,callback){
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
        // Store hash in your password DB. 
    });
});
}

module.exports.getUserByUsername = function(username,callback){
    let query = {username: username};
    User.findOne(query,callback);
}

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    // Load hash from your password DB. 
bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
  if(err) throw err;
  callback(null,isMatch);
});
}

