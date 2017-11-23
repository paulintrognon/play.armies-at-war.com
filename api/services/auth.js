'use strict';

const jwt = require('jsonwebtoken');
const secret = require('config/api').secret;

const logger = require('../logger');

module.exports = {
  decode,
};

function decode(token) {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    logger.error(e.message);
    return;
  }
}
