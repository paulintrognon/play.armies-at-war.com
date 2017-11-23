'use strict';

const express = require('express');
const router = express.Router();

const version = require('../../package.json').version;
const authenticationController = require('../controllers/authenticationController');

router.get('/', (req, res, next) => next({ hello: 'world' }));
router.get('/version', (req, res, next) => next({ version }));

router.get('/auth', (req, res, next) => next(authenticationController.authenticate(req)));

module.exports = router;
