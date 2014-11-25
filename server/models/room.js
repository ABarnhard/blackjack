'use strict';

var mongoose = require('mongoose'),
    RoomSchema = null;

RoomSchema = new mongoose.Schema({
  name: {type: String, required: true, validate: [nameV, 'room name length'], unique: true},
  password: {type: String, required: true, validate: [pswV, 'password length']},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
});

function nameV(v){
  return v.length >= 1;
}

function pswV(v){
  return v.length >= 3;
}

module.exports = mongoose.model('Room', RoomSchema);
