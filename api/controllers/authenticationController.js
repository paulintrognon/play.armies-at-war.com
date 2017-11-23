'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');

module.exports = {
  authenticate,
};

function authenticate(req) {
  return {
    user: req.user,
  };
}
