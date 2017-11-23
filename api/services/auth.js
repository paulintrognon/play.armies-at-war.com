'use strict';

const jwt = require('jsonwebtoken');
const secret = require('config/api').secret;

const logger = require('../logger');

module.exports = {
  decode,
};

function decode(cookies) {
  if (!cookies || !cookies.aaw_token) {
    throw new Error('no cookies found - cannot identify user');
  }
  const token = cookies.aaw_token;
  try {
    const user = jwt.verify(token, secret);
    return {
      id: user.user_id,
      name: user.user_name,
    }
  } catch (e) {
    logger.error(e.message);
    return;
  }
}
