const rules = require('../recommended-rules');
const util = require('ember-template-imports/src/util');
const plugin = require('../index');

module.exports = [
  {
    plugins: { ember: plugin },
    rules,
  },

  {
    /**
     * We don't want to *always* have the preprocessor active,
     * it's only relevant on gjs and gts files.
     *
     * Additionally, we need to declare a global (which is private API)
     * so that ESLint doesn't report errors about the variable being undefined.
     * While this is true, it's a temporary thing for babel to do further processing
     * on -- and isn't relevant to user-land code.
     */
    files: ['**/*.gjs', '**/*.gts'],
    processor: 'ember/<template>',
    languageOptions: {
      globals: {
        [util.TEMPLATE_TAG_PLACEHOLDER]: 'readonly',
      },
    },
  },
];
