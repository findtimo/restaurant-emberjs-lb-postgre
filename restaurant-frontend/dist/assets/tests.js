'use strict';

define("restaurant/tests/helpers/index", ["exports", "ember-qunit"], function (_exports, _emberQunit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setupApplicationTest = setupApplicationTest;
  _exports.setupRenderingTest = setupRenderingTest;
  _exports.setupTest = setupTest;
  0; //eaimeta@70e063a35619d71f0,"ember-qunit"eaimeta@70e063a35619d71f
  // This file exists to provide wrappers around ember-qunit's
  // test setup functions. This way, you can easily extend the setup that is
  // needed per test type.

  function setupApplicationTest(hooks, options) {
    (0, _emberQunit.setupApplicationTest)(hooks, options);

    // Additional setup for application tests can be done here.
    //
    // For example, if you need an authenticated session for each
    // application test, you could do:
    //
    // hooks.beforeEach(async function () {
    //   await authenticateSession(); // ember-simple-auth
    // });
    //
    // This is also a good place to call test setup functions coming
    // from other addons:
    //
    // setupIntl(hooks); // ember-intl
    // setupMirage(hooks); // ember-cli-mirage
  }
  function setupRenderingTest(hooks, options) {
    (0, _emberQunit.setupRenderingTest)(hooks, options);

    // Additional setup for rendering tests can be done here.
  }
  function setupTest(hooks, options) {
    (0, _emberQunit.setupTest)(hooks, options);

    // Additional setup for unit tests can be done here.
  }
});
define("restaurant/tests/integration/components/navbar-test", ["qunit", "restaurant/tests/helpers", "@ember/test-helpers", "@ember/template-factory"], function (_qunit, _helpers, _testHelpers, _templateFactory) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"restaurant/tests/helpers",0,"@ember/test-helpers",0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | navbar', function (hooks) {
    (0, _helpers.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Navbar />
      */
      {
        "id": "D20dANma",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"navbar\"]]",
        "moduleName": "/Users/timothykoh/Desktop/Restaurant/restaurant-frontend/restaurant/tests/integration/components/navbar-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Navbar>
              template block text
            </Navbar>
          
      */
      {
        "id": "f/AxHZ5I",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"navbar\"]]",
        "moduleName": "/Users/timothykoh/Desktop/Restaurant/restaurant-frontend/restaurant/tests/integration/components/navbar-test.js",
        "isStrictMode": false
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("restaurant/tests/test-helper", ["restaurant/app", "restaurant/config/environment", "qunit", "@ember/test-helpers", "qunit-dom", "ember-qunit"], function (_app, _environment, QUnit, _testHelpers, _qunitDom, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"restaurant/app",0,"restaurant/config/environment",0,"qunit",0,"@ember/test-helpers",0,"qunit-dom",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _qunitDom.setup)(QUnit.assert);
  (0, _emberQunit.start)();
});
define("restaurant/tests/unit/adapters/application-test", ["qunit", "restaurant/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"restaurant/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("restaurant/tests/unit/controllers/login-test", ["qunit", "restaurant/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"restaurant/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | login', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:login');
      assert.ok(controller);
    });
  });
});
define("restaurant/tests/unit/routes/history-test", ["qunit", "restaurant/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"restaurant/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | history', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:history');
      assert.ok(route);
    });
  });
});
define("restaurant/tests/unit/routes/login-test", ["qunit", "restaurant/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"restaurant/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | login', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:login');
      assert.ok(route);
    });
  });
});
define("restaurant/tests/unit/routes/orderdetails-test", ["qunit", "restaurant/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"restaurant/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | orderdetails', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:orderdetails');
      assert.ok(route);
    });
  });
});
define("restaurant/tests/unit/routes/register-test", ["qunit", "restaurant/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"restaurant/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | register', function (hooks) {
    (0, _helpers.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:register');
      assert.ok(route);
    });
  });
});
define("restaurant/tests/unit/services/config-test", ["qunit", "restaurant/tests/helpers"], function (_qunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"restaurant/tests/helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | config', function (hooks) {
    (0, _helpers.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:config');
      assert.ok(service);
    });
  });
});
define('restaurant/config/environment', [], function() {
  var prefix = 'restaurant';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('restaurant/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
