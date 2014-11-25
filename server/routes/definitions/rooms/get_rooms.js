'use strict';

var Room = require('../../../models/room');

module.exports = {
  description: 'Find All Rooms',
  tags:['rooms'],
  handler: function(request, reply){
    Room.find().populate('creator', 'avatar').select('-password').exec(function(err, rooms){
      reply(rooms);
    });
  }
};
