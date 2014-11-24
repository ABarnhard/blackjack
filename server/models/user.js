'use strict';

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    request  = require('request'),
    fs       = require('fs'),
    path     = require('path'),
    UserSchema = null,
    User = null;

UserSchema = new mongoose.Schema({
  username:  {type: String, required: true, validate: [usernameV, 'username length'], unique: true},
  password:  {type: String, required: true, validate: [passwordV, 'password length']},
  avatar:    {type: String, required: true},
  createdAt: {type: Date,   required: true, default: Date.now}
});

UserSchema.methods.encrypt = function(){
  this.password = bcrypt.hashSync(this.password, 10);
};

UserSchema.statics.login = function(obj, cb){
  User.findOne({username: obj.username}, function(err, user){
    if(!user){
     return cb();
    }

    var isGood = bcrypt.compareSync(obj.password, user.password);

    if(!isGood){
      return cb();
    }

    cb(user);
  });
};

UserSchema.methods.downloadAvatar = function(cb){
  var folderPath    = __dirname + '/../../public/assets/img/' + this._id,
      fileExtension = path.extname(this.avatar),
      filePath      = folderPath + '/avatar' + fileExtension,
      self          = this;


  fs.mkdir(folderPath, function(err){
    if(err){return cb(err);}
    var ws = fs.createWriteStream(filePath);
    request.get(self.avatar).pipe(ws);
    ws.on('finish', function(){
      self.avatar = '/assets/img/' + self._id + '/avatar' + fileExtension;
      cb(err);
    });
  });
};

function usernameV(v){
  return v.length >= 3 && v.length <= 12;
}

function passwordV(v){
  return v.length === 60;
}

User = mongoose.model('User', UserSchema);
module.exports = User;
