'use strict';

module.exports = function(socket){
  socket.emit('online');

  socket.on('global-chat', require('./global-chat'));

};
