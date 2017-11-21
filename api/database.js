'use strict';

const bluebird = require('bluebird');
const config = require('config/api').database;
const logger = require('./logger');
const Sequelize = require('sequelize');

module.exports = createDb();

function createDb() {
  const db = {
    sequelize: null,
  };

  db.connect = connect;
  db.close = close;

  return db;

  // ------------------------------------------------------

  function connect(options = {}) {
    db.sequelize = new Sequelize(config.database, config.user, config.password, {
      host: config.host,
      dialect: 'mysql',
      logging: false,

      dialectOptions: {
        socketPath: '/var/run/mysqld/mysqld.sock',
        multipleStatements: options.multipleStatements,
      },

      define: {
        paranoid: true,
      },

      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    });

    logger.debug('Connecting to database...', {
      database: config.database,
      user: config.user,
      host: config.host,
    });

    return db.sequelize.authenticate()
      .then(() => {
        logger.info('Successfull connection to database', {
          database: config.database,
        });
      })
      .catch(err => {
        logger.error('Unable to connect to the database', {
          database: config.database,
          user: config.user,
          host: config.host,
          error: err,
        });
        throw err;
      })
      .return(db.sequelize);
  }

  function close() {
    if (!db.sequelize) {
      logger.warning('database not connected - cannot close');
      return bluebird.resolve();
    }
    logger.info('database closed');
    return db.sequelize.close();
  }
}
