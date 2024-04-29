'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      extension: 'scss',
    },

    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
  });

  return app.toTree();
};
