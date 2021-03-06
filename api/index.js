'use strict';

/**
 * Checking config existance
 */
const path = require('path');
const fs = require('fs');
const configPath = path.join(__dirname, '../config/index.js');
if (!fs.existsSync(configPath)) {
  throw new Error('You need to create the config/index.js file from index.js.example');
}

/**
 * Loading dependencies
 */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const cors = require('cors');
const database = require('./database');
const express = require('express');
const http = require('http');
const logger = require('./logger');
const moment = require('moment');
moment.locale('fr');

/**
 * Creating the app
 */
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser());

/**
 * CORS options
 */
const corsOptions = {
  origin: config.host,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11) choke on 204
}
app.use(cors(corsOptions));

/**
 * Configuring the app
 */
const port = (config.api && config.api.port) || 3001;
app.set('port', port);

/**
 * Connecting to MySQL
 * /!\ We need to connect to mysql first thing in order to have sequelize initialized
 */
database.connect()
  .then(() => {

  /**
   * Add auth middleware
   */
  const authService = require('./services/auth');
  app.use(function (req, res, next) {
    req.user = authService.decode(req.cookies);
    next();
  });

  /**
   * Adding the routes
   */
  const routes = require('./routes');
  app.use('/', routes);

   /**
    * Adding the response middleware
    */
   const response = require('./response');
   app.use(response);

  /**
   * Starting the app
   */
  const server = http.createServer(app);

  server.listen(port, () => {
    const address = server.address();
    logger.info(`API up and running on ${address.address}:${address.port}`);
  });
});
