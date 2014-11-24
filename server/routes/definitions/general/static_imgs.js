'use strict';

module.exports = {
  description: 'Static Routes for Avatar Images',
  tags:['general'],
  auth: false,
  handler: {
    directory: {
      path: __dirname + '/../../../../assets'
    }
  }
};
