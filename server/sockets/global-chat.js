'use strict';

module.exports = function(data){
  // console.log('message recieved from client', data);
  this.broadcast.emit('bGlobal-chat', data);
  this.emit('bGlobal-chat', data);
};
