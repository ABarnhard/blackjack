'use strict';

module.exports = {
  description: 'Get User Status',
  tags:['users'],
  handler: function(request, reply){
    reply({username: request.auth.credentials.username, avatar: request.auth.credentials.avatar});
  }
};
