'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'autofitplan',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    API: {},
  };

  if (process.env.ENABLE_MIRAGE) {
    ENV['ember-cli-mirage'] = {
      enabled: true,
    };
  } else {
    ENV['ember-cli-mirage'] = {
      enabled: false,
    };
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    if (ENV['ember-cli-mirage'].enabled) {
      ENV.API.host = '';
    } else {
      ENV.API.host = 'http://localhost:3009';
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV.API.host = '';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.API.host = 'https://api.autofitplan.com';
  }

  return ENV;
};
