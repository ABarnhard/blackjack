'use strict';

var Joi  = require('joi'),
    Room = require('../../../models/room');

module.exports = {
  description: 'Create A New Game Room',
  tags:['rooms'],
  validate: {
    payload: {
      name: Joi.string().required().min(1),
      password: Joi.string().required().min(3)
    }
  },
  handler: function(request, reply){
    request.payload.creator = request.auth.credentials._id;
    var r = new Room(request.payload);
    r.save(function(err){
      if(err){
        reply.code(400);
      }else{
        r.populate({path:'creator', select:'avatar'}, function(err, room){
          room.password = null;
          reply(room);
        });
      }
    });
  }
};
