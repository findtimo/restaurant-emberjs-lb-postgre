'use strict';



;define("restaurant/adapters/application", ["exports", "@ember-data/adapter/rest", "@ember/service", "@ember/object"], function (_exports, _rest, _service, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember-data/adapter/rest",0,"@ember/service",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let ApplicationAdapter = _exports.default = (_dec = (0, _object.computed)('session.isAuthenticated', 'session.data.authenticated.token'), (_class = class ApplicationAdapter extends _rest.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
      _defineProperty(this, "host", 'http://localhost:8080');
      _defineProperty(this, "namespace", 'api');
    }
    get headers() {
      let headers = {};
      if (this.session.isAuthenticated) {
        headers['token'] = this.session.data.authenticated.token;
      }
      return headers;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "headers", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "headers"), _class.prototype)), _class));
});
;define("restaurant/app", ["exports", "@ember/application", "ember-resolver", "ember-load-initializers", "restaurant/config/environment"], function (_exports, _application, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"ember-resolver",0,"ember-load-initializers",0,"restaurant/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class App extends _application.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);
      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);
      _defineProperty(this, "Resolver", _emberResolver.default);
    }
  }
  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("restaurant/authenticators/token", ["exports", "ember-simple-auth/authenticators/base", "@ember/service", "fetch"], function (_exports, _base, _service, _fetch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/authenticators/base",0,"@ember/service",0,"fetch"eaimeta@70e063a35619d71f
  var _default = _exports.default = _base.default.extend({
    config: (0, _service.inject)(),
    session: (0, _service.inject)(),
    async restore(data) {
      let {
        token
      } = data;
      if (token) {
        return data;
      } else {
        console.log('Error');
        throw 'no valid session data';
      }
    },
    authenticate(email, password) {
      const url = `${this.config.host}/api/customers/login`;
      return (0, _fetch.default)(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      }).then(response => {
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        return response.json();
      }).then(data => {
        if (data.id) {
          // Rename 'id' to 'token' and structure it under the 'authenticated' key
          return {
            token: data.id,
            userId: data.userId
          };
        } else {
          throw new Error('Token was not provided in the response');
        }
      });
    },
    invalidate() {
      const url = `${this.config.host}/api/customers/logout`;
      return (0, _fetch.default)(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.session.data.authenticated.token}`
        }
      });
    }
  });
});
;define("restaurant/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component/-private/ember-component-manager"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-accordion", ["exports", "ember-bootstrap/components/bs-accordion"], function (_exports, _bsAccordion) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsAccordion.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-accordion"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-accordion/item", ["exports", "ember-bootstrap/components/bs-accordion/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-accordion/item"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-accordion/item/body", ["exports", "ember-bootstrap/components/bs-accordion/item/body"], function (_exports, _body) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-accordion/item/body"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-accordion/item/title", ["exports", "ember-bootstrap/components/bs-accordion/item/title"], function (_exports, _title) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-accordion/item/title"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-alert", ["exports", "ember-bootstrap/components/bs-alert"], function (_exports, _bsAlert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsAlert.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-alert"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-button-group", ["exports", "ember-bootstrap/components/bs-button-group"], function (_exports, _bsButtonGroup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsButtonGroup.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-button-group"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-button-group/button", ["exports", "ember-bootstrap/components/bs-button-group/button"], function (_exports, _button) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-button-group/button"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-button", ["exports", "ember-bootstrap/components/bs-button"], function (_exports, _bsButton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsButton.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-button"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-carousel", ["exports", "ember-bootstrap/components/bs-carousel"], function (_exports, _bsCarousel) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsCarousel.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-carousel"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-carousel/slide", ["exports", "ember-bootstrap/components/bs-carousel/slide"], function (_exports, _slide) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _slide.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-carousel/slide"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-collapse", ["exports", "ember-bootstrap/components/bs-collapse"], function (_exports, _bsCollapse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsCollapse.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-collapse"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-dropdown", ["exports", "ember-bootstrap/components/bs-dropdown"], function (_exports, _bsDropdown) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsDropdown.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-dropdown/button", ["exports", "ember-bootstrap/components/bs-dropdown/button"], function (_exports, _button) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/button"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-dropdown/menu", ["exports", "ember-bootstrap/components/bs-dropdown/menu"], function (_exports, _menu) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _menu.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/menu"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-dropdown/menu/divider", ["exports", "ember-bootstrap/components/bs-dropdown/menu/divider"], function (_exports, _divider) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _divider.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/menu/divider"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-dropdown/menu/item", ["exports", "ember-bootstrap/components/bs-dropdown/menu/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/menu/item"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-dropdown/toggle", ["exports", "ember-bootstrap/components/bs-dropdown/toggle"], function (_exports, _toggle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-dropdown/toggle"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form", ["exports", "ember-bootstrap/components/bs-form"], function (_exports, _bsForm) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsForm.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element", ["exports", "ember-bootstrap/components/bs-form/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/control", ["exports", "ember-bootstrap/components/bs-form/element/control"], function (_exports, _control) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _control.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/control/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/control/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/checkbox"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/control/input", ["exports", "ember-bootstrap/components/bs-form/element/control/input"], function (_exports, _input) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _input.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/input"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/control/radio", ["exports", "ember-bootstrap/components/bs-form/element/control/radio"], function (_exports, _radio) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _radio.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/radio"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/control/switch", ["exports", "ember-bootstrap/components/bs-form/element/control/switch"], function (_exports, _switch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _switch.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/switch"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/control/textarea", ["exports", "ember-bootstrap/components/bs-form/element/control/textarea"], function (_exports, _textarea) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _textarea.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/control/textarea"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/errors", ["exports", "ember-bootstrap/components/bs-form/element/errors"], function (_exports, _errors) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _errors.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/errors"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/feedback-icon", ["exports", "ember-bootstrap/components/bs-form/element/feedback-icon"], function (_exports, _feedbackIcon) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _feedbackIcon.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/feedback-icon"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/help-text", ["exports", "ember-bootstrap/components/bs-form/element/help-text"], function (_exports, _helpText) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _helpText.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/help-text"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/label", ["exports", "ember-bootstrap/components/bs-form/element/label"], function (_exports, _label) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _label.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/label"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/layout/horizontal", ["exports", "ember-bootstrap/components/bs-form/element/layout/horizontal"], function (_exports, _horizontal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _horizontal.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/horizontal"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/layout/horizontal/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/layout/inline", ["exports", "ember-bootstrap/components/bs-form/element/layout/inline"], function (_exports, _inline) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inline.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/inline"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/layout/inline/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/layout/inline/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/inline/checkbox"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/layout/vertical", ["exports", "ember-bootstrap/components/bs-form/element/layout/vertical"], function (_exports, _vertical) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _vertical.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/vertical"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/layout/vertical/checkbox", ["exports", "ember-bootstrap/components/bs-form/element/layout/vertical/checkbox"], function (_exports, _checkbox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/layout/vertical/checkbox"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-form/element/legend", ["exports", "ember-bootstrap/components/bs-form/element/legend"], function (_exports, _legend) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _legend.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-form/element/legend"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-link-to", ["exports", "ember-bootstrap/components/bs-link-to"], function (_exports, _bsLinkTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsLinkTo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-link-to"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-list-group", ["exports", "ember-bootstrap/components/bs-list-group"], function (_exports, _bsListGroup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsListGroup.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-list-group"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-list-group/item", ["exports", "ember-bootstrap/components/bs-list-group/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-list-group/item"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-modal-simple", ["exports", "ember-bootstrap/components/bs-modal-simple"], function (_exports, _bsModalSimple) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsModalSimple.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal-simple"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-modal", ["exports", "ember-bootstrap/components/bs-modal"], function (_exports, _bsModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsModal.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-modal/body", ["exports", "ember-bootstrap/components/bs-modal/body"], function (_exports, _body) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/body"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-modal/dialog", ["exports", "ember-bootstrap/components/bs-modal/dialog"], function (_exports, _dialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dialog.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/dialog"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-modal/footer", ["exports", "ember-bootstrap/components/bs-modal/footer"], function (_exports, _footer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _footer.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/footer"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-modal/header", ["exports", "ember-bootstrap/components/bs-modal/header"], function (_exports, _header) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/header"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-modal/header/close", ["exports", "ember-bootstrap/components/bs-modal/header/close"], function (_exports, _close) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _close.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/header/close"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-modal/header/title", ["exports", "ember-bootstrap/components/bs-modal/header/title"], function (_exports, _title) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-modal/header/title"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-nav", ["exports", "ember-bootstrap/components/bs-nav"], function (_exports, _bsNav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsNav.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-nav"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-nav/item", ["exports", "ember-bootstrap/components/bs-nav/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-nav/item"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-navbar", ["exports", "ember-bootstrap/components/bs-navbar"], function (_exports, _bsNavbar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsNavbar.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-navbar/content", ["exports", "ember-bootstrap/components/bs-navbar/content"], function (_exports, _content) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar/content"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-navbar/link-to", ["exports", "ember-bootstrap/components/bs-navbar/link-to"], function (_exports, _linkTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar/link-to"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-navbar/nav", ["exports", "ember-bootstrap/components/bs-navbar/nav"], function (_exports, _nav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar/nav"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-navbar/toggle", ["exports", "ember-bootstrap/components/bs-navbar/toggle"], function (_exports, _toggle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-navbar/toggle"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-popover", ["exports", "ember-bootstrap/components/bs-popover"], function (_exports, _bsPopover) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsPopover.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-popover"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-popover/element", ["exports", "ember-bootstrap/components/bs-popover/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-popover/element"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-progress", ["exports", "ember-bootstrap/components/bs-progress"], function (_exports, _bsProgress) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsProgress.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-progress"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-progress/bar", ["exports", "ember-bootstrap/components/bs-progress/bar"], function (_exports, _bar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bar.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-progress/bar"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-spinner", ["exports", "ember-bootstrap/components/bs-spinner"], function (_exports, _bsSpinner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsSpinner.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-spinner"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-tab", ["exports", "ember-bootstrap/components/bs-tab"], function (_exports, _bsTab) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsTab.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-tab"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-tab/pane", ["exports", "ember-bootstrap/components/bs-tab/pane"], function (_exports, _pane) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pane.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-tab/pane"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-tooltip", ["exports", "ember-bootstrap/components/bs-tooltip"], function (_exports, _bsTooltip) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsTooltip.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-tooltip"eaimeta@70e063a35619d71f
});
;define("restaurant/components/bs-tooltip/element", ["exports", "ember-bootstrap/components/bs-tooltip/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/components/bs-tooltip/element"eaimeta@70e063a35619d71f
});
;define("restaurant/components/food", ["exports", "@ember/component", "@ember/component/template-only", "@ember/template-factory"], function (_exports, _component, _templateOnly, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="food">
    <Food::Image/>
    <Food::Details
      @name={{@food.name}}
      @price={{@food.price}}
      @id={{@food.id}}/>
  </div>
  */
  {
    "id": "KJDztgfl",
    "block": "[[[10,0],[14,0,\"food\"],[12],[1,\"\\n  \"],[8,[39,1],null,null,null],[1,\"\\n  \"],[8,[39,2],null,[[\"@name\",\"@price\",\"@id\"],[[30,1,[\"name\"]],[30,1,[\"price\"]],[30,1,[\"id\"]]]],null],[1,\"\\n\"],[13]],[\"@food\"],false,[\"div\",\"food/image\",\"food/details\"]]",
    "moduleName": "restaurant/components/food.hbs",
    "isStrictMode": false
  });
  var _default = _exports.default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
});
;define("restaurant/components/food/details", ["exports", "@ember/component", "@glimmer/component", "@ember/service", "@ember/object", "@ember/template-factory"], function (_exports, _component, _component2, _service, _object, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <h3>{{@name}}</h3>
  <p class="food-price">{{@price}}$</p>
  {{!-- <LinkTo class="cart-btn" @route="cart">Add to Cart</LinkTo> --}}
  <a class="cart-btn" {{on "click" this.addToCart}}>Add to Cart</a>
  */
  {
    "id": "wxM22pkc",
    "block": "[[[10,\"h3\"],[12],[1,[30,1]],[13],[1,\"\\n\"],[10,2],[14,0,\"food-price\"],[12],[1,[30,2]],[1,\"$\"],[13],[1,\"\\n\"],[11,3],[24,0,\"cart-btn\"],[4,[38,3],[\"click\",[30,0,[\"addToCart\"]]],null],[12],[1,\"Add to Cart\"],[13]],[\"@name\",\"@price\"],false,[\"h3\",\"p\",\"a\",\"on\"]]",
    "moduleName": "restaurant/components/food/details.hbs",
    "isStrictMode": false
  });
  let ProductDetailsComponent = _exports.default = (_dec = (0, _service.inject)('shopping-cart'), (_class = class ProductDetailsComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "cart", _descriptor, this);
    }
    addToCart() {
      const {
        id,
        name,
        image,
        price
      } = this.args;
      console.log('Item received:', this.args);
      this.cart.addItem({
        id: id,
        name,
        image: image,
        price: price
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "cart", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "addToCart", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addToCart"), _class.prototype)), _class));
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ProductDetailsComponent);
});
;define("restaurant/components/food/image", ["exports", "@ember/component", "@ember/component/template-only", "@ember/template-factory"], function (_exports, _component, _templateOnly, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component/template-only",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="food-image">
    <img src="/assets/images/beats-solo-red.png" alt="">
  </div>
  */
  {
    "id": "d2itnHsY",
    "block": "[[[10,0],[14,0,\"food-image\"],[12],[1,\"\\n  \"],[10,\"img\"],[14,\"src\",\"/assets/images/beats-solo-red.png\"],[14,\"alt\",\"\"],[12],[13],[1,\"\\n\"],[13]],[],false,[\"div\",\"img\"]]",
    "moduleName": "restaurant/components/food/image.hbs",
    "isStrictMode": false
  });
  var _default = _exports.default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)());
});
;define("restaurant/components/navbar", ["exports", "@ember/component", "@glimmer/component", "@ember/service", "@ember/object", "@ember/template-factory"], function (_exports, _component, _component2, _service, _object, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@ember/object",0,"@ember/component"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="top-header-area" id="sticker">
      <div class="container">
          <div class="row">
              <div class="col-lg-12 col-sm-12 text-center">
                  <div class="main-menu-wrap">
                      <nav class="main-menu">
                          <ul>
                              <li class="current-list-item">
                                  <LinkTo @route="home">Home</LinkTo>
                              </li>
                              <li>
                                  <LinkTo @route="menu">Menu</LinkTo>
                              </li>
                              <li>
                                  <div class="header-icons">
                                      <LinkTo @route="cart">Cart</LinkTo>
                                  </div>
                              </li>
                              {{#if this.session.isAuthenticated}}
                              <li>
                                  <div class="header-icons">
                                      <LinkTo @route="history">History</LinkTo>
                                  </div>
                              </li>
                              <li>
                                  <div class="header-icons" {{on "click" this.logout}}>
                                      <LinkTo @route="home">Logout</LinkTo>
                                  </div>
                              </li>
                              {{else}}
                              <li>
                                  <div class="header-icons">
                                      <LinkTo @route="login">Login</LinkTo>
                                  </div>
                              </li>
                              {{/if}}
                          </ul>
                      </nav>
                  </div>
              </div>
          </div>
      </div>
  </div>
  
  */
  {
    "id": "36zvzEKM",
    "block": "[[[10,0],[14,0,\"top-header-area\"],[14,1,\"sticker\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-lg-12 col-sm-12 text-center\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"main-menu-wrap\"],[12],[1,\"\\n                    \"],[10,\"nav\"],[14,0,\"main-menu\"],[12],[1,\"\\n                        \"],[10,\"ul\"],[12],[1,\"\\n                            \"],[10,\"li\"],[14,0,\"current-list-item\"],[12],[1,\"\\n                                \"],[8,[39,4],null,[[\"@route\"],[\"home\"]],[[\"default\"],[[[[1,\"Home\"]],[]]]]],[1,\"\\n                            \"],[13],[1,\"\\n                            \"],[10,\"li\"],[12],[1,\"\\n                                \"],[8,[39,4],null,[[\"@route\"],[\"menu\"]],[[\"default\"],[[[[1,\"Menu\"]],[]]]]],[1,\"\\n                            \"],[13],[1,\"\\n                            \"],[10,\"li\"],[12],[1,\"\\n                                \"],[10,0],[14,0,\"header-icons\"],[12],[1,\"\\n                                    \"],[8,[39,4],null,[[\"@route\"],[\"cart\"]],[[\"default\"],[[[[1,\"Cart\"]],[]]]]],[1,\"\\n                                \"],[13],[1,\"\\n                            \"],[13],[1,\"\\n\"],[41,[30,0,[\"session\",\"isAuthenticated\"]],[[[1,\"                            \"],[10,\"li\"],[12],[1,\"\\n                                \"],[10,0],[14,0,\"header-icons\"],[12],[1,\"\\n                                    \"],[8,[39,4],null,[[\"@route\"],[\"history\"]],[[\"default\"],[[[[1,\"History\"]],[]]]]],[1,\"\\n                                \"],[13],[1,\"\\n                            \"],[13],[1,\"\\n                            \"],[10,\"li\"],[12],[1,\"\\n                                \"],[11,0],[24,0,\"header-icons\"],[4,[38,6],[\"click\",[30,0,[\"logout\"]]],null],[12],[1,\"\\n                                    \"],[8,[39,4],null,[[\"@route\"],[\"home\"]],[[\"default\"],[[[[1,\"Logout\"]],[]]]]],[1,\"\\n                                \"],[13],[1,\"\\n                            \"],[13],[1,\"\\n\"]],[]],[[[1,\"                            \"],[10,\"li\"],[12],[1,\"\\n                                \"],[10,0],[14,0,\"header-icons\"],[12],[1,\"\\n                                    \"],[8,[39,4],null,[[\"@route\"],[\"login\"]],[[\"default\"],[[[[1,\"Login\"]],[]]]]],[1,\"\\n                                \"],[13],[1,\"\\n                            \"],[13],[1,\"\\n\"]],[]]],[1,\"                        \"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"div\",\"nav\",\"ul\",\"li\",\"link-to\",\"if\",\"on\"]]",
    "moduleName": "restaurant/components/navbar.hbs",
    "isStrictMode": false
  });
  let NavbarComponent = _exports.default = (_class = class NavbarComponent extends _component2.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    logout() {
      this.session.invalidate().then(() => {
        this.router.transitionTo('home'); // Redirect to the home route after logout
      }).catch(error => {
        console.error('Logout failed:', error); // Handle errors
      });
    }
    get isAuthenticated() {
      return this.session.isAuthenticated;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "logout", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "logout"), _class.prototype)), _class);
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, NavbarComponent);
});
;define("restaurant/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-welcome-page/components/welcome-page"eaimeta@70e063a35619d71f
});
;define("restaurant/container-debug-adapter", ["exports", "ember-resolver/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _containerDebugAdapter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-resolver/container-debug-adapter"eaimeta@70e063a35619d71f
});
;define("restaurant/controllers/cart", ["exports", "@ember/controller", "@ember/service", "@ember/object", "fetch"], function (_exports, _controller, _service, _object, _fetch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@ember/object",0,"fetch"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let CartController = _exports.default = (_dec = (0, _service.inject)('shopping-cart'), (_class = class CartController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
      _initializerDefineProperty(this, "config", _descriptor2, this);
      _initializerDefineProperty(this, "cart", _descriptor3, this);
    }
    get subtotal() {
      return this.cart.itemList.reduce((acc, item) => acc + item.price * item.count, 0);
    }
    get tax() {
      return 0.09 * this.subtotal;
    }
    get total() {
      const rawTotal = this.subtotal + this.tax;
      return rawTotal.toFixed(2);
    }
    updateItemCount(item, event) {
      const newCount = parseInt(event.target.value, 10);
      if (!isNaN(newCount) && newCount >= 0) {
        item.count = newCount;
      } else {
        item.count = 0;
      }
      this.cart.saveCart();
    }
    checkout() {
      const orderData = {
        placeDate: new Date().toISOString(),
        customerId: this.session.data.authenticated.userId,
        totalPrice: this.subtotal + this.tax
      };
      console.log(this.session.data.authenticated.token);
      (0, _fetch.default)(`${this.config.host}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.session.data.authenticated.token}`
        },
        body: JSON.stringify(orderData)
      }).then(response => response.json()).then(orderResponse => {
        if (!orderResponse.id) {
          throw new Error('Order creation failed');
        }
        const orderId = orderResponse.id;
        const orderFoodPromises = this.cart.itemList.map(item => {
          const orderFoodData = {
            orderId: orderId,
            foodId: item.id,
            quantity: item.count
          };
          // console.log(JSON.stringify(orderFoodData))

          return (0, _fetch.default)(`${this.config.host}/api/orderfoods`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${this.session.data.authenticated.token}`
            },
            body: JSON.stringify(orderFoodData)
          });
        });
        return Promise.all(orderFoodPromises);
      }).then(orderFoodResponses => Promise.all(orderFoodResponses.map(res => res.json()))).then(() => {
        alert('Checkout successful!');
        this.cart.empty(); // Empty the cart after successful checkout
      }).catch(error => {
        alert(`Checkout failed: ${error.message}`);
      });
    }
    removeFromCart(item) {
      this.cart.removeItem(item);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "config", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "cart", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "updateItemCount", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateItemCount"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "checkout", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "checkout"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "removeFromCart", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "removeFromCart"), _class.prototype)), _class));
});
;define("restaurant/controllers/item", ["exports", "@ember/controller", "@glimmer/tracking", "@ember/object"], function (_exports, _controller, _tracking, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@glimmer/tracking",0,"@ember/object"eaimeta@70e063a35619d71f
  class ItemController extends _controller.default {
    //   get productImage() {
    // return this.model.colors.find(({ color }) => color === this.color).image;
    //   }
    //   @action
    //   onChangeColor(newColor) {
    //     this.color = newColor;
    //   }
    //   @action
    //   toggleZoom() {
    //     this.isZoomed = !this.isZoomed;
    //   }
  }
  _exports.default = ItemController;
});
;define("restaurant/controllers/login", ["exports", "@ember/controller", "@ember/service", "@ember/object", "@glimmer/tracking"], function (_exports, _controller, _service, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@ember/object",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let LoginController = _exports.default = (_class = class LoginController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
      _initializerDefineProperty(this, "error", _descriptor2, this);
      _initializerDefineProperty(this, "email", _descriptor3, this);
      _initializerDefineProperty(this, "password", _descriptor4, this);
    }
    async login(event) {
      event.preventDefault();
      try {
        await this.session.authenticate('authenticator:token', this.email, this.password);
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    }
    update(attr, event) {
      this[attr] = event.target.value;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "email", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "password", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "login", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "login"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "update", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "update"), _class.prototype)), _class);
});
;define("restaurant/controllers/register", ["exports", "@ember/controller", "@ember/service", "@ember/object", "@glimmer/tracking"], function (_exports, _controller, _service, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service",0,"@ember/object",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let RegisterController = _exports.default = (_class = class RegisterController extends _controller.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "error", _descriptor2, this);
      _initializerDefineProperty(this, "email", _descriptor3, this);
      _initializerDefineProperty(this, "password", _descriptor4, this);
      _initializerDefineProperty(this, "address", _descriptor5, this);
    }
    async register(event) {
      event.preventDefault();
      const url = 'http://localhost:8080/api/customers'; // Replace with your actual API endpoint

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            address: this.address
          })
        });
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        const result = await response.json();
        console.log('Registration successful:', result);
        this.router.transitionTo('login'); // Redirect to login route upon successful registration
      } catch (error) {
        console.error('Registration failed:', error);
        this.error = 'Failed to register'; // Update error handling message
      }
    }
    update(attr, event) {
      this[attr] = event.target.value;
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "error", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "email", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "password", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "address", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "register", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "register"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "update", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "update"), _class.prototype)), _class);
});
;define("restaurant/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/app-version", ["exports", "@ember/component/helper", "restaurant/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _helper, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper",0,"restaurant/config/environment",0,"ember-cli-app-version/utils/regexp"eaimeta@70e063a35619d71f
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;
    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }
    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }
    return match ? match[0] : version;
  }
  var _default = _exports.default = (0, _helper.helper)(appVersion);
});
;define("restaurant/helpers/bs-contains", ["exports", "ember-bootstrap/helpers/bs-contains"], function (_exports, _bsContains) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "bsContains", {
    enumerable: true,
    get: function () {
      return _bsContains.bsContains;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsContains.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-contains"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/bs-default", ["exports", "ember-bootstrap/helpers/bs-default"], function (_exports, _bsDefault) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsDefault.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-default"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/bs-eq", ["exports", "ember-bootstrap/helpers/bs-eq"], function (_exports, _bsEq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsEq.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-eq"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/bs-form-horiz-input-class", ["exports", "ember-bootstrap/helpers/bs-form-horiz-input-class"], function (_exports, _bsFormHorizInputClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsFormHorizInputClass.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-form-horiz-input-class"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/bs-form-horiz-offset-class", ["exports", "ember-bootstrap/helpers/bs-form-horiz-offset-class"], function (_exports, _bsFormHorizOffsetClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsFormHorizOffsetClass.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-form-horiz-offset-class"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/bs-noop", ["exports", "ember-bootstrap/helpers/bs-noop"], function (_exports, _bsNoop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsNoop.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-noop"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/bs-size-class", ["exports", "ember-bootstrap/helpers/bs-size-class"], function (_exports, _bsSizeClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsSizeClass.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-size-class"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/bs-type-class", ["exports", "ember-bootstrap/helpers/bs-type-class"], function (_exports, _bsTypeClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsTypeClass.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/helpers/bs-type-class"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/cancel-all"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/currency", ["exports", "@ember/component/helper"], function (_exports, _helper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/helper"eaimeta@70e063a35619d71f
  class currency extends _helper.default {
    compute(params, hash = {}) {
      const [number] = params;
      const {
        sign = '$'
      } = hash;
      const dollars = Math.floor(number);
      let cents = Math.floor(number * 100 % 100);
      if (cents.toString().length === 1) {
        cents = '0' + cents;
      }
      return `${sign}${dollars}.${cents}`;
    }
  }
  _exports.default = currency;
});
;define("restaurant/helpers/did-insert", ["exports", "ember-render-helpers/helpers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-render-helpers/helpers/did-insert"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/did-update", ["exports", "ember-render-helpers/helpers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-render-helpers/helpers/did-update"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/element", ["exports", "ember-element-helper/helpers/element"], function (_exports, _element) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-element-helper/helpers/element"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/ensure-safe-component", ["exports", "@embroider/util"], function (_exports, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _util.EnsureSafeComponentHelper;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@embroider/util"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/on-document", ["exports", "ember-on-helper/helpers/on-document"], function (_exports, _onDocument) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _onDocument.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-on-helper/helpers/on-document"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/on-window", ["exports", "ember-on-helper/helpers/on-window"], function (_exports, _onWindow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _onWindow.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-on-helper/helpers/on-window"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/on", ["exports", "ember-on-helper/helpers/on"], function (_exports, _on) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _on.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-on-helper/helpers/on"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/helpers/page-title"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/perform"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-inflector/lib/helpers/pluralize"eaimeta@70e063a35619d71f
  var _default = _exports.default = _pluralize.default;
});
;define("restaurant/helpers/popper-modifier", ["exports", "ember-popper-modifier/helpers/popper-modifier"], function (_exports, _popperModifier) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "buildPopperModifier", {
    enumerable: true,
    get: function () {
      return _popperModifier.buildPopperModifier;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _popperModifier.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-popper-modifier/helpers/popper-modifier"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/ref-to", ["exports", "ember-ref-bucket/helpers/ref-to"], function (_exports, _refTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _refTo.default;
    }
  });
  Object.defineProperty(_exports, "refTo", {
    enumerable: true,
    get: function () {
      return _refTo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-ref-bucket/helpers/ref-to"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-inflector/lib/helpers/singularize"eaimeta@70e063a35619d71f
  var _default = _exports.default = _singularize.default;
});
;define("restaurant/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/task"eaimeta@70e063a35619d71f
});
;define("restaurant/helpers/will-destroy", ["exports", "ember-render-helpers/helpers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-render-helpers/helpers/will-destroy"eaimeta@70e063a35619d71f
});
;define("restaurant/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "restaurant/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-app-version/initializer-factory",0,"restaurant/config/environment"eaimeta@70e063a35619d71f
  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }
  var _default = _exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define("restaurant/initializers/ember-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /*
    This code initializes EmberData in an Ember application.
  */
  var _default = _exports.default = {
    name: 'ember-data',
    initialize(application) {
      application.registerOptionsForType('serializer', {
        singleton: false
      });
      application.registerOptionsForType('adapter', {
        singleton: false
      });
    }
  };
});
;define("restaurant/initializers/ember-simple-auth", ["exports", "ember-simple-auth/initializers/ember-simple-auth"], function (_exports, _emberSimpleAuth) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberSimpleAuth.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/initializers/ember-simple-auth"eaimeta@70e063a35619d71f
});
;define("restaurant/initializers/load-bootstrap-config", ["exports", "restaurant/config/environment", "ember-bootstrap/config", "ember-bootstrap/version"], function (_exports, _environment, _config, _version) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.initialize = initialize;
  0; //eaimeta@70e063a35619d71f0,"restaurant/config/environment",0,"ember-bootstrap/config",0,"ember-bootstrap/version"eaimeta@70e063a35619d71f
  function initialize( /* container, application */
  ) {
    _config.default.load(_environment.default['ember-bootstrap'] || {});
    (0, _version.registerLibrary)();
  }
  var _default = _exports.default = {
    name: 'load-bootstrap-config',
    initialize
  };
});
;define("restaurant/instance-initializers/global-ref-cleanup", ["exports", "ember-ref-bucket/instance-initializers/global-ref-cleanup"], function (_exports, _globalRefCleanup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _globalRefCleanup.default;
    }
  });
  Object.defineProperty(_exports, "initialize", {
    enumerable: true,
    get: function () {
      return _globalRefCleanup.initialize;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-ref-bucket/instance-initializers/global-ref-cleanup"eaimeta@70e063a35619d71f
});
;define("restaurant/models/food", ["exports", "@ember-data/model"], function (_exports, _model) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@ember-data/model"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let ProductModel = _exports.default = (_class = class ProductModel extends _model.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "name", _descriptor, this);
      _initializerDefineProperty(this, "price", _descriptor2, this);
      _initializerDefineProperty(this, "image", _descriptor3, this);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "name", [_model.attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "price", [_model.attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "image", [_model.attr], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
});
;define("restaurant/modifiers/bs-conditional-attribute", ["exports", "ember-bootstrap/modifiers/bs-conditional-attribute"], function (_exports, _bsConditionalAttribute) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _bsConditionalAttribute.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-bootstrap/modifiers/bs-conditional-attribute"eaimeta@70e063a35619d71f
});
;define("restaurant/modifiers/create-ref", ["exports", "ember-ref-bucket/modifiers/create-ref"], function (_exports, _createRef) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _createRef.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-ref-bucket/modifiers/create-ref"eaimeta@70e063a35619d71f
});
;define("restaurant/modifiers/did-insert", ["exports", "@ember/render-modifiers/modifiers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-insert"eaimeta@70e063a35619d71f
});
;define("restaurant/modifiers/did-update", ["exports", "@ember/render-modifiers/modifiers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-update"eaimeta@70e063a35619d71f
});
;define("restaurant/modifiers/focus-trap", ["exports", "ember-focus-trap/modifiers/focus-trap.js"], function (_exports, _focusTrap) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _focusTrap.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-focus-trap/modifiers/focus-trap.js"eaimeta@70e063a35619d71f
});
;define("restaurant/modifiers/popper-tooltip", ["exports", "ember-popper-modifier/modifiers/popper-tooltip"], function (_exports, _popperTooltip) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _popperTooltip.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-popper-modifier/modifiers/popper-tooltip"eaimeta@70e063a35619d71f
});
;define("restaurant/modifiers/popper", ["exports", "ember-popper-modifier/modifiers/popper"], function (_exports, _popper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _popper.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-popper-modifier/modifiers/popper"eaimeta@70e063a35619d71f
});
;define("restaurant/modifiers/style", ["exports", "ember-style-modifier/modifiers/style"], function (_exports, _style) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _style.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-style-modifier/modifiers/style"eaimeta@70e063a35619d71f
});
;define("restaurant/modifiers/will-destroy", ["exports", "@ember/render-modifiers/modifiers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/will-destroy"eaimeta@70e063a35619d71f
});
;define("restaurant/router", ["exports", "@ember/routing/router", "restaurant/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/router",0,"restaurant/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class Router extends _router.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "location", _environment.default.locationType);
      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }
  }
  _exports.default = Router;
  Router.map(function () {
    this.route('home', {
      path: '/'
    });
    this.route('menu');
    this.route('menu/item', {
      path: '/menu/:item_id'
    });
    this.route('customer-portal');
    this.route('cart');
    this.route('not-found', {
      path: '/*path'
    });
    this.route('login');
    this.route('register');
    this.route('history');
    this.route('orderdetails', {
      path: '/orderdetails/:order_id'
    });
  });
});
;define("restaurant/routes/application", ["exports", "@ember/routing/route", "@ember/service", "@ember/object", "@glimmer/tracking"], function (_exports, _route, _service, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service",0,"@ember/object",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let ApplicationRoute = _exports.default = (_class = class ApplicationRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    beforeModel() {
      return this.session.setup().then(() => {
        // console.log('Session token:', this.session.data);
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
});
;define("restaurant/routes/cart", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let CartRoute = _exports.default = (_class = class CartRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    beforeModel(transition) {
      this.session.requireAuthentication(transition, 'login');
    }
    model() {}
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
});
;define("restaurant/routes/history", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let HistoryRoute = _exports.default = (_class = class HistoryRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "config", _descriptor, this);
      _initializerDefineProperty(this, "session", _descriptor2, this);
      _initializerDefineProperty(this, "store", _descriptor3, this);
    }
    beforeModel(transition) {
      this.session.requireAuthentication(transition, 'login');
    }
    async model() {
      try {
        // Fetch order data from the API
        let response = await fetch(`${this.config.host}/api/customers/${this.session.data.authenticated.userId}/orders/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.session.data.authenticated.token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        let data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "config", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "store", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
});
;define("restaurant/routes/login", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let LoginRoute = _exports.default = (_class = class LoginRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "session", _descriptor, this);
    }
    beforeModel() {
      this.session.prohibitAuthentication('home');
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
});
;define("restaurant/routes/menu", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let MenuRoute = _exports.default = (_class = class MenuRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "store", _descriptor, this);
    }
    // model(params) {
    //     const { item_id } = params;
    //     return item_id;
    // }

    async model() {
      return this.store.findAll('food');
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "store", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
});
;define("restaurant/routes/orderdetails", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2; // app/routes/orderdetails.js
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  let OrderdetailsRoute = _exports.default = (_class = class OrderdetailsRoute extends _route.default {
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "config", _descriptor, this);
      _initializerDefineProperty(this, "session", _descriptor2, this);
    }
    async model(params) {
      try {
        const filter = {
          where: {
            orderId: params.order_id
          },
          // Filter to match orderId
          include: [{
            relation: 'food'
          }] // Include related food details
        };
        let response = await fetch(`${this.config.host}/api/orderfoods?filter=${encodeURIComponent(JSON.stringify(filter))}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.session.data.authenticated.token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch order-food details');
        }
        let data = await response.json();
        console.log("Order Foods with Details:", data);
        return data;
      } catch (error) {
        console.error('Error fetching order-food details:', error);
        return [];
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "config", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "session", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
});
;define("restaurant/routes/register", ["exports", "@ember/routing/route"], function (_exports, _route) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route"eaimeta@70e063a35619d71f
  class RegisterRoute extends _route.default {}
  _exports.default = RegisterRoute;
});
;define("restaurant/serializers/application", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/json"eaimeta@70e063a35619d71f
  class ApplicationSerializer extends _json.default {
    // ...
  }
  _exports.default = ApplicationSerializer;
});
;define("restaurant/services/-ensure-registered", ["exports", "@embroider/util/services/ensure-registered"], function (_exports, _ensureRegistered) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ensureRegistered.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@embroider/util/services/ensure-registered"eaimeta@70e063a35619d71f
});
;define("restaurant/services/config", ["exports", "@ember/service"], function (_exports, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class ConfigService extends _service.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "host", 'http://localhost:8080');
      _defineProperty(this, "namespace", 'api');
    }
  }
  _exports.default = ConfigService;
});
;define("restaurant/services/cookies", ["exports", "ember-cookies/services/cookies"], function (_exports, _cookies) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cookies.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cookies/services/cookies"eaimeta@70e063a35619d71f
});
;define("restaurant/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-page-title/services/page-title"eaimeta@70e063a35619d71f
});
;define("restaurant/services/session", ["exports", "ember-simple-auth/services/session"], function (_exports, _session) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _session.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/services/session"eaimeta@70e063a35619d71f
});
;define("restaurant/services/shopping-cart", ["exports", "@ember/service", "@glimmer/tracking"], function (_exports, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class Item {
    constructor(item) {
      _defineProperty(this, "id", void 0);
      _defineProperty(this, "count", void 0);
      _defineProperty(this, "name", void 0);
      _defineProperty(this, "image", void 0);
      _defineProperty(this, "price", void 0);
      this.id = item.id;
      this.count = item.count;
      this.name = item.name;
      this.image = item.image;
      this.price = item.price;
    }
  }
  let ShoppingCartService = _exports.default = (_class = class ShoppingCartService extends _service.default {
    constructor() {
      super();
      _initializerDefineProperty(this, "itemList", _descriptor, this);
      this.loadCart();
    }
    loadCart() {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        this.itemList = JSON.parse(storedCart).map(item => new Item(item));
      }
    }
    addItem(item) {
      // console.log('Item received:', item);
      const existingItem = this.itemList.find(existingItem => {
        return existingItem.name === item.name;
      });
      if (existingItem) {
        existingItem.count += 1;
      } else {
        this.itemList = [...this.itemList, new Item({
          ...item,
          count: 1
        })];
      }
      this.saveCart();
    }
    saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(this.itemList));
    }
    removeItem(itemToRemove) {
      this.itemList = this.itemList.filter(item => item !== itemToRemove);
      this.saveCart();
    }
    empty() {
      this.itemList = [];
      this.saveCart();
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "itemList", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  })), _class);
});
;define("restaurant/services/store", ["exports", "@ember/debug", "ember-data/store"], function (_exports, _debug, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"ember-data/store"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the store service. Use `export { default } from 'ember-data/store';` in app/services/store.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("restaurant/session-stores/application", ["exports", "ember-simple-auth/session-stores/cookie"], function (_exports, _cookie) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/session-stores/cookie"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // app/session-stores/application.js
  class ApplicationSessionStore extends _cookie.default {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "cookieName", 'ember_simple_auth-session');
      // This must match the cookie name you see in the browser.
      _defineProperty(this, "secure", true);
      _defineProperty(this, "sameSite", 'Strict');
    }
  }
  _exports.default = ApplicationSessionStore;
});
;define("restaurant/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Restaurant"}}
  
  {{! The following component displays Ember's default welcome message. }}
  {{!-- <WelcomePage /> --}}
  {{! Feel free to remove this! }}
  
  <body>
  	{{navbar}}
  	{{!-- <div class="top-header-area" id="sticker">
  		<div class="container">
  			<div class="row">
  				<div class="col-lg-12 col-sm-12 text-center">
  					<div class="main-menu-wrap">
  						<nav class="main-menu">
  							<ul>
  								<li class="current-list-item">
                                      <LinkTo @route="home">Home</LinkTo>
  								</li>
  								<li>
                                      <LinkTo @route="menu">Menu</LinkTo>
  								</li>
  								<li>
  									<div class="header-icons">
                                      <LinkTo @route="cart">Cart</LinkTo>
  									</div>
  								</li>
  								{{#if this.session.isAuthenticated}}
  								<li>
  									<div class="header-icons" {{on "click" this.logout}}>
  										<LinkTo @route="home">Logout</LinkTo>
  									</div>
  								</li>
  								{{else}}
  								<li>
  									<div class="header-icons">
  										<LinkTo @route="login">Login</LinkTo>
  									</div>
  								</li>
  								{{/if}}
  							</ul>
  						</nav>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div> --}}
  	{{!-- end header --}}
  	
  	{{!-- search area --}}
  	<div class="search-area">
  		<div class="container">
  			<div class="row">
  				<div class="col-lg-12">
  					<span class="close-btn"><i class="fas fa-window-close"></i></span>
  					<div class="search-bar">
  						<div class="search-bar-tablecell">
  							<h3>Search For:</h3>
  							<input type="text" placeholder="Keywords">
  							<button type="submit">Search <i class="fas fa-search"></i></button>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  	{{!-- end search area --}}
      {{outlet}}
  </body>
  */
  {
    "id": "949s772t",
    "block": "[[[1,[28,[35,0],[\"Restaurant\"],null]],[1,\"\\n\\n\"],[1,\"\\n\"],[10,\"body\"],[12],[1,\"\\n\\t\"],[1,[34,2]],[1,\"\\n\"],[1,\"\\t\\n\"],[1,\"\\t\"],[10,0],[14,0,\"search-area\"],[12],[1,\"\\n\\t\\t\"],[10,0],[14,0,\"container\"],[12],[1,\"\\n\\t\\t\\t\"],[10,0],[14,0,\"row\"],[12],[1,\"\\n\\t\\t\\t\\t\"],[10,0],[14,0,\"col-lg-12\"],[12],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,1],[14,0,\"close-btn\"],[12],[10,\"i\"],[14,0,\"fas fa-window-close\"],[12],[13],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,0],[14,0,\"search-bar\"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\t\"],[10,0],[14,0,\"search-bar-tablecell\"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[10,\"h3\"],[12],[1,\"Search For:\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[10,\"input\"],[14,\"placeholder\",\"Keywords\"],[14,4,\"text\"],[12],[13],[1,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[10,\"button\"],[14,4,\"submit\"],[12],[1,\"Search \"],[10,\"i\"],[14,0,\"fas fa-search\"],[12],[13],[13],[1,\"\\n\\t\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\"],[1,\"    \"],[46,[28,[37,10],null,null],null,null,null],[1,\"\\n\"],[13]],[],false,[\"page-title\",\"body\",\"navbar\",\"div\",\"span\",\"i\",\"h3\",\"input\",\"button\",\"component\",\"-outlet\"]]",
    "moduleName": "restaurant/templates/application.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/templates/cart", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- breadcrumb-section --}}
  <div class="breadcrumb-section breadcrumb-bg">
      <div class="container">
          <div class="row">
              <div class="col-lg-8 offset-lg-2 text-center">
                  <div class="breadcrumb-text">
                      <p>Fresh and Organic</p>
                      <h1>Cart</h1>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {{!-- end breadcrumb section --}}
  
  {{!-- cart --}}
  <div class="cart-section mt-150 mb-150">
      <div class="container">
          <div class="row">
              <div class="col-lg-8 col-md-12">
                  <div class="cart-table-wrap">
                      <table class="cart-table">
                          <thead class="cart-table-head">
                              <tr class="table-head-row">
                                  <th class="product-remove"></th>
                                  <th class="product-image">Product Image</th>
                                  <th class="product-name">Name</th>
                                  <th class="product-price">Price</th>
                                  <th class="product-quantity">Quantity</th>
                              </tr>
                          </thead>
                          <tbody>
                              {{#each this.cart.itemList as |item|}}
                               <tr class="table-body-row">
                                  <td class="product-remove"><a {{on "click" (fn this.removeFromCart item)}}><i class="far fa-window-close">x</i></a></td>
                                  {{!-- <td class="product-remove"><a href="#"><i class="far fa-window-close">x</i></a></td> --}}
                                  <td class="product-image"><img src="assets/img/products/product-img-1.jpg" alt=""></td>
                                  <td class="product-name">{{item.name}}</td>
                                      <td class="product-price">{{item.price}}</td>
                                      <td class="product-quantity"><input type="number" 
                                      min="0"
                                      value={{item.count}}
                                      {{on "input" (fn this.updateItemCount item)}}
                                      ></td>
                              </tr>
                              {{/each}}
                          </tbody>
                      </table>
                  </div>
              </div>
  
              <div class="col-lg-4">
                  <div class="total-section">
                      <table class="total-table">
                          <thead class="total-table-head">
                              <tr class="table-total-row">
                                  <th>Total</th>
                                  <th>Price</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr class="total-data">
                                  <td><strong>Subtotal: </strong></td>
                                  <td>{{currency this.subtotal}}</td>
                              </tr>
                              <tr class="total-data">
                                  <td><strong>Tax: </strong></td>
                                  <td>{{currency this.tax}}</td>
                              </tr>
                              <tr class="total-data">
                                  <td><strong>Total: </strong></td>
                                  <td>{{currency this.total}}</td>
                              </tr>
                          </tbody>
                      </table>
                      <div class="cart-buttons">
                          <a href="cart" class="boxed-btn">Update Cart</a>
                          <a type="button" class="boxed-btn black" {{on "click" this.checkout}}>Check Out</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {{!-- end cart --}}
  */
  {
    "id": "GwiCxHxu",
    "block": "[[[10,0],[14,0,\"breadcrumb-section breadcrumb-bg\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-lg-8 offset-lg-2 text-center\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"breadcrumb-text\"],[12],[1,\"\\n                    \"],[10,2],[12],[1,\"Fresh and Organic\"],[13],[1,\"\\n                    \"],[10,\"h1\"],[12],[1,\"Cart\"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[1,\"\\n\"],[10,0],[14,0,\"cart-section mt-150 mb-150\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-lg-8 col-md-12\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"cart-table-wrap\"],[12],[1,\"\\n                    \"],[10,\"table\"],[14,0,\"cart-table\"],[12],[1,\"\\n                        \"],[10,\"thead\"],[14,0,\"cart-table-head\"],[12],[1,\"\\n                            \"],[10,\"tr\"],[14,0,\"table-head-row\"],[12],[1,\"\\n                                \"],[10,\"th\"],[14,0,\"product-remove\"],[12],[13],[1,\"\\n                                \"],[10,\"th\"],[14,0,\"product-image\"],[12],[1,\"Product Image\"],[13],[1,\"\\n                                \"],[10,\"th\"],[14,0,\"product-name\"],[12],[1,\"Name\"],[13],[1,\"\\n                                \"],[10,\"th\"],[14,0,\"product-price\"],[12],[1,\"Price\"],[13],[1,\"\\n                                \"],[10,\"th\"],[14,0,\"product-quantity\"],[12],[1,\"Quantity\"],[13],[1,\"\\n                            \"],[13],[1,\"\\n                        \"],[13],[1,\"\\n                        \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,0,[\"cart\",\"itemList\"]]],null]],null],null,[[[1,\"                             \"],[10,\"tr\"],[14,0,\"table-body-row\"],[12],[1,\"\\n                                \"],[10,\"td\"],[14,0,\"product-remove\"],[12],[11,3],[4,[38,12],[\"click\",[28,[37,13],[[30,0,[\"removeFromCart\"]],[30,1]],null]],null],[12],[10,\"i\"],[14,0,\"far fa-window-close\"],[12],[1,\"x\"],[13],[13],[13],[1,\"\\n\"],[1,\"                                \"],[10,\"td\"],[14,0,\"product-image\"],[12],[10,\"img\"],[14,\"src\",\"assets/img/products/product-img-1.jpg\"],[14,\"alt\",\"\"],[12],[13],[13],[1,\"\\n                                \"],[10,\"td\"],[14,0,\"product-name\"],[12],[1,[30,1,[\"name\"]]],[13],[1,\"\\n                                    \"],[10,\"td\"],[14,0,\"product-price\"],[12],[1,[30,1,[\"price\"]]],[13],[1,\"\\n                                    \"],[10,\"td\"],[14,0,\"product-quantity\"],[12],[11,\"input\"],[24,\"min\",\"0\"],[16,2,[30,1,[\"count\"]]],[24,4,\"number\"],[4,[38,12],[\"input\",[28,[37,13],[[30,0,[\"updateItemCount\"]],[30,1]],null]],null],[12],[13],[13],[1,\"\\n                            \"],[13],[1,\"\\n\"]],[1]],null],[1,\"                        \"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\\n            \"],[10,0],[14,0,\"col-lg-4\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"total-section\"],[12],[1,\"\\n                    \"],[10,\"table\"],[14,0,\"total-table\"],[12],[1,\"\\n                        \"],[10,\"thead\"],[14,0,\"total-table-head\"],[12],[1,\"\\n                            \"],[10,\"tr\"],[14,0,\"table-total-row\"],[12],[1,\"\\n                                \"],[10,\"th\"],[12],[1,\"Total\"],[13],[1,\"\\n                                \"],[10,\"th\"],[12],[1,\"Price\"],[13],[1,\"\\n                            \"],[13],[1,\"\\n                        \"],[13],[1,\"\\n                        \"],[10,\"tbody\"],[12],[1,\"\\n                            \"],[10,\"tr\"],[14,0,\"total-data\"],[12],[1,\"\\n                                \"],[10,\"td\"],[12],[10,\"strong\"],[12],[1,\"Subtotal: \"],[13],[13],[1,\"\\n                                \"],[10,\"td\"],[12],[1,[28,[35,18],[[30,0,[\"subtotal\"]]],null]],[13],[1,\"\\n                            \"],[13],[1,\"\\n                            \"],[10,\"tr\"],[14,0,\"total-data\"],[12],[1,\"\\n                                \"],[10,\"td\"],[12],[10,\"strong\"],[12],[1,\"Tax: \"],[13],[13],[1,\"\\n                                \"],[10,\"td\"],[12],[1,[28,[35,18],[[30,0,[\"tax\"]]],null]],[13],[1,\"\\n                            \"],[13],[1,\"\\n                            \"],[10,\"tr\"],[14,0,\"total-data\"],[12],[1,\"\\n                                \"],[10,\"td\"],[12],[10,\"strong\"],[12],[1,\"Total: \"],[13],[13],[1,\"\\n                                \"],[10,\"td\"],[12],[1,[28,[35,18],[[30,0,[\"total\"]]],null]],[13],[1,\"\\n                            \"],[13],[1,\"\\n                        \"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[10,0],[14,0,\"cart-buttons\"],[12],[1,\"\\n                        \"],[10,3],[14,6,\"cart\"],[14,0,\"boxed-btn\"],[12],[1,\"Update Cart\"],[13],[1,\"\\n                        \"],[11,3],[24,0,\"boxed-btn black\"],[24,4,\"button\"],[4,[38,12],[\"click\",[30,0,[\"checkout\"]]],null],[12],[1,\"Check Out\"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"item\"],false,[\"div\",\"p\",\"h1\",\"table\",\"thead\",\"tr\",\"th\",\"tbody\",\"each\",\"-track-array\",\"td\",\"a\",\"on\",\"fn\",\"i\",\"img\",\"input\",\"strong\",\"currency\"]]",
    "moduleName": "restaurant/templates/cart.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/templates/history", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "History"}}
  {{!-- breadcrumb-section --}}
  <div class="breadcrumb-section breadcrumb-bg">
      <div class="container">
          <div class="row">
              <div class="col-lg-8 offset-lg-2 text-center">
                  <div class="breadcrumb-text">
                      <h1>Order History</h1>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {{!-- end breadcrumb section --}}
  
  <div class="login-section mt-100 mb-100">
      <div class="container">
  
          <div class="row">
              <div class="">
                  {{#if this.model.length}}
                  <ul>
                      {{#each this.model as |order|}}
                          <LinkTo @route="orderdetails" @model={{order.id}}>
                              <div class="food p-3 mb-2">
                                  <div class="d-flex justify-content-between align-items-center">
                                      <h3 class="mb-0">Order ID: {{order.id}}</h3>
                                      <span>{{ order.placeDate}}</span>
                                  </div>
                                  <div>Price: {{order.totalPrice}}</div>
                              </div>
                          </LinkTo>
                      {{/each}}
                  </ul>
                  {{else}}
                  <p>No orders found.</p>
                  {{/if}}
              </div>
          </div>
      </div>
  </div>
  */
  {
    "id": "9SCUwdGA",
    "block": "[[[1,[28,[35,0],[\"History\"],null]],[1,\"\\n\"],[10,0],[14,0,\"breadcrumb-section breadcrumb-bg\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-lg-8 offset-lg-2 text-center\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"breadcrumb-text\"],[12],[1,\"\\n                    \"],[10,\"h1\"],[12],[1,\"Order History\"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[1,\"\\n\"],[10,0],[14,0,\"login-section mt-100 mb-100\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"length\"]],[[[1,\"                \"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"model\"]]],null]],null],null,[[[1,\"                        \"],[8,[39,7],null,[[\"@route\",\"@model\"],[\"orderdetails\",[30,1,[\"id\"]]]],[[\"default\"],[[[[1,\"\\n                            \"],[10,0],[14,0,\"food p-3 mb-2\"],[12],[1,\"\\n                                \"],[10,0],[14,0,\"d-flex justify-content-between align-items-center\"],[12],[1,\"\\n                                    \"],[10,\"h3\"],[14,0,\"mb-0\"],[12],[1,\"Order ID: \"],[1,[30,1,[\"id\"]]],[13],[1,\"\\n                                    \"],[10,1],[12],[1,[30,1,[\"placeDate\"]]],[13],[1,\"\\n                                \"],[13],[1,\"\\n                                \"],[10,0],[12],[1,\"Price: \"],[1,[30,1,[\"totalPrice\"]]],[13],[1,\"\\n                            \"],[13],[1,\"\\n                        \"]],[]]]]],[1,\"\\n\"]],[1]],null],[1,\"                \"],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[10,2],[12],[1,\"No orders found.\"],[13],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13]],[\"order\"],false,[\"page-title\",\"div\",\"h1\",\"if\",\"ul\",\"each\",\"-track-array\",\"link-to\",\"h3\",\"span\",\"p\"]]",
    "moduleName": "restaurant/templates/history.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/templates/home", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="hero-area hero-bg">
      <div class="container">
          <div class="row">
              <div class="col-lg-9 offset-lg-2 text-center">
                  <div class="hero-text">
                      <div class="hero-text-tablecell">
                          <p class="subtitle">We Serve Food</p>
                          <h1>Timothy's Restaurant</h1>
                          <div class="hero-btns">
                                  <LinkTo class="boxed-btn" @route="menu">Order now</LinkTo>
                              <a href="https://findtimo.github.io/" class="bordered-btn">About</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  */
  {
    "id": "A9mXU+2P",
    "block": "[[[10,0],[14,0,\"hero-area hero-bg\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-lg-9 offset-lg-2 text-center\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"hero-text\"],[12],[1,\"\\n                    \"],[10,0],[14,0,\"hero-text-tablecell\"],[12],[1,\"\\n                        \"],[10,2],[14,0,\"subtitle\"],[12],[1,\"We Serve Food\"],[13],[1,\"\\n                        \"],[10,\"h1\"],[12],[1,\"Timothy's Restaurant\"],[13],[1,\"\\n                        \"],[10,0],[14,0,\"hero-btns\"],[12],[1,\"\\n                                \"],[8,[39,3],[[24,0,\"boxed-btn\"]],[[\"@route\"],[\"menu\"]],[[\"default\"],[[[[1,\"Order now\"]],[]]]]],[1,\"\\n                            \"],[10,3],[14,6,\"https://findtimo.github.io/\"],[14,0,\"bordered-btn\"],[12],[1,\"About\"],[13],[1,\"\\n                        \"],[13],[1,\"\\n                    \"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13]],[],false,[\"div\",\"p\",\"h1\",\"link-to\",\"a\"]]",
    "moduleName": "restaurant/templates/home.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/templates/login", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- app/templates/menu.hbs --}}
  
  {{!-- breadcrumb-section --}}
  <div class="breadcrumb-section breadcrumb-bg">
      <div class="container">
          <div class="row">
              <div class="col-lg-8 offset-lg-2 text-center">
                  <div class="breadcrumb-text">
                      <h1>Login</h1>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {{!-- end breadcrumb section --}}
  
  {{!-- login section --}}
  <div class="login-section mt-5 mb-5">
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-6">
                  <form {{ on "submit" this.login }}>
                      <div class="form-group">
                          <label for="email">Email:</label>
                          <input type="email" name="email" class="form-control" {{ on "change" (fn this.update "email" )
                              }} placeholder="Enter your email">
                      </div>
                      <div class="form-group mt-4">
                          <label for="password">Password:</label>
                          <input type="password" name="password" class="form-control" {{ on "change" (fn
                              this.update "password" ) }} placeholder="Enter your password">
                      </div>
                      <button type="submit" class="btn btn-primary btn-block mt-4">Login</button>
                  </form>
              </div>
              {{#if this.error}}
              <div class="alert alert-danger mt-2" role="alert">
                  <strong>{{this.error}}</strong>
              </div>
              {{/if}}
          </div>
          <div class="container mt-5">
              <div class="row">
                  <div class="col-md-12 text-center">
                  New here? <LinkTo @route="register">Register Now</LinkTo>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {{!-- end login section --}}
  */
  {
    "id": "DVDErdsM",
    "block": "[[[1,\"\\n\"],[10,0],[14,0,\"breadcrumb-section breadcrumb-bg\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-lg-8 offset-lg-2 text-center\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"breadcrumb-text\"],[12],[1,\"\\n                    \"],[10,\"h1\"],[12],[1,\"Login\"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[1,\"\\n\"],[10,0],[14,0,\"login-section mt-5 mb-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row justify-content-center\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-md-6\"],[12],[1,\"\\n                \"],[11,\"form\"],[4,[38,3],[\"submit\",[30,0,[\"login\"]]],null],[12],[1,\"\\n                    \"],[10,0],[14,0,\"form-group\"],[12],[1,\"\\n                        \"],[10,\"label\"],[14,\"for\",\"email\"],[12],[1,\"Email:\"],[13],[1,\"\\n                        \"],[11,\"input\"],[24,3,\"email\"],[24,0,\"form-control\"],[24,\"placeholder\",\"Enter your email\"],[24,4,\"email\"],[4,[38,3],[\"change\",[28,[37,6],[[30,0,[\"update\"]],\"email\"],null]],null],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[10,0],[14,0,\"form-group mt-4\"],[12],[1,\"\\n                        \"],[10,\"label\"],[14,\"for\",\"password\"],[12],[1,\"Password:\"],[13],[1,\"\\n                        \"],[11,\"input\"],[24,3,\"password\"],[24,0,\"form-control\"],[24,\"placeholder\",\"Enter your password\"],[24,4,\"password\"],[4,[38,3],[\"change\",[28,[37,6],[[30,0,[\"update\"]],\"password\"],null]],null],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[10,\"button\"],[14,0,\"btn btn-primary btn-block mt-4\"],[14,4,\"submit\"],[12],[1,\"Login\"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"],[41,[30,0,[\"error\"]],[[[1,\"            \"],[10,0],[14,0,\"alert alert-danger mt-2\"],[14,\"role\",\"alert\"],[12],[1,\"\\n                \"],[10,\"strong\"],[12],[1,[30,0,[\"error\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"container mt-5\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"col-md-12 text-center\"],[12],[1,\"\\n                New here? \"],[8,[39,10],null,[[\"@route\"],[\"register\"]],[[\"default\"],[[[[1,\"Register Now\"]],[]]]]],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"div\",\"h1\",\"form\",\"on\",\"label\",\"input\",\"fn\",\"button\",\"if\",\"strong\",\"link-to\"]]",
    "moduleName": "restaurant/templates/login.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/templates/menu", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- app/templates/menu.hbs --}}
  {{!-- breadcrumb-section --}}
  <div class="breadcrumb-section breadcrumb-bg">
      <div class="container">
          <div class="row">
              <div class="col-lg-8 offset-lg-2 text-center">
                  <div class="breadcrumb-text">
                      <p>Fresh and Organic</p>
                      <h1>Menu</h1>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {{!-- end breadcrumb section --}}
  
  {{!-- products --}}
  <div class="product-section mt-100 mb-100">
      <div class="container">
  
          <div class="row product-lists">
              {{#each this.model as |food|}}
                  <div class="col-lg-4 col-md-6 text-center">
                      <Food @food={{food}}/>
                  </div>
              {{/each}}
          </div>
  
      </div>
  </div>
  {{!-- end products --}}
  */
  {
    "id": "LP6ybL48",
    "block": "[[[10,0],[14,0,\"breadcrumb-section breadcrumb-bg\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-lg-8 offset-lg-2 text-center\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"breadcrumb-text\"],[12],[1,\"\\n                    \"],[10,2],[12],[1,\"Fresh and Organic\"],[13],[1,\"\\n                    \"],[10,\"h1\"],[12],[1,\"Menu\"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[1,\"\\n\"],[10,0],[14,0,\"product-section mt-100 mb-100\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n\\n        \"],[10,0],[14,0,\"row product-lists\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"model\"]]],null]],null],null,[[[1,\"                \"],[10,0],[14,0,\"col-lg-4 col-md-6 text-center\"],[12],[1,\"\\n                    \"],[8,[39,5],null,[[\"@food\"],[[30,1]]],null],[1,\"\\n                \"],[13],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[\"food\"],false,[\"div\",\"p\",\"h1\",\"each\",\"-track-array\",\"food\"]]",
    "moduleName": "restaurant/templates/menu.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/templates/menu/item", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- app/templates/menu.hbs --}}
  <h1>Menu</h1>
  <ul>
    {{#each @model as |menuItem|}}
      <li>{{menuItem.name}} - {{menuItem.price}}</li>
    {{/each}}
  </ul>
  
  item {{this.model}} works
  */
  {
    "id": "zb8sQxLA",
    "block": "[[[10,\"h1\"],[12],[1,\"Menu\"],[13],[1,\"\\n\"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,1]],null]],null],null,[[[1,\"    \"],[10,\"li\"],[12],[1,[30,2,[\"name\"]]],[1,\" - \"],[1,[30,2,[\"price\"]]],[13],[1,\"\\n\"]],[2]],null],[13],[1,\"\\n\\nitem \"],[1,[30,0,[\"model\"]]],[1,\" works\"]],[\"@model\",\"menuItem\"],false,[\"h1\",\"ul\",\"each\",\"-track-array\",\"li\"]]",
    "moduleName": "restaurant/templates/menu/item.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/templates/not-found", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    404 Not Found
  */
  {
    "id": "lpdTvqW8",
    "block": "[[[1,\"404 Not Found\"]],[],false,[]]",
    "moduleName": "restaurant/templates/not-found.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/templates/orderdetails", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{page-title "Order Details"}}
  {{!-- app/templates/menu.hbs --}}
  <div class="breadcrumb-section breadcrumb-bg">
      <div class="container">
          <div class="row">
              <div class="col-lg-8 offset-lg-2 text-center">
                  <div class="breadcrumb-text">
                      <h1>Order Details</h1>
                  </div>
              </div>
          </div>
      </div>
  </div>
  
  <div class="login-section mt-100 mb-100">
      <div class="container">
          <div class="row">
              <div class="col-12">
                  <div class="container mt-4">
                      <div class="order-details">
                          <h2>Order Details</h2>
                          {{#if this.model.length}}
                          <ul>
                              {{#each this.model as |item|}}
                              <div class="food p-3 mb-2 bg-light">
                                  <div class="d-flex justify-content-between align-items-center">
                                      <h3 class="mb-0">{{item.food.name}}</h3>
                                      <span>${{ item.food.price }}</span>
                                  </div>
                                      <span>Quantity: {{item.quantity}}</span>
                              </div>
                              {{/each}}
                          </ul>
                          {{else}}
                          <p>No details found for this order.</p>
                          {{/if}}
                      </div>
                  </div>
  
                  {{!-- {{#if this.model.length}}
                  <ul class="list-unstyled">
                      {{#each this.model as |order|}}
                      <li class="food p-3 mb-2 bg-light">
                          <div class="d-flex justify-content-between align-items-center">
                              <h3 class="mb-0">{{#link-to "orderdetails" order.id}}Order ID: {{order.id}}{{/link-to}}</h3>
                              <span>{{format-date order.placeDate}}</span>
                          </div>
                      </li>
                      {{/each}}
                  </ul>
                  {{else}}
                  <p>No orders found.</p>
                  {{/if}} --}}
              </div>
          </div>
      </div>
  </div>
  */
  {
    "id": "t+ED+Uk9",
    "block": "[[[1,[28,[35,0],[\"Order Details\"],null]],[1,\"\\n\"],[10,0],[14,0,\"breadcrumb-section breadcrumb-bg\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-lg-8 offset-lg-2 text-center\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"breadcrumb-text\"],[12],[1,\"\\n                    \"],[10,\"h1\"],[12],[1,\"Order Details\"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"login-section mt-100 mb-100\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-12\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"container mt-4\"],[12],[1,\"\\n                    \"],[10,0],[14,0,\"order-details\"],[12],[1,\"\\n                        \"],[10,\"h2\"],[12],[1,\"Order Details\"],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"length\"]],[[[1,\"                        \"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"model\"]]],null]],null],null,[[[1,\"                            \"],[10,0],[14,0,\"food p-3 mb-2 bg-light\"],[12],[1,\"\\n                                \"],[10,0],[14,0,\"d-flex justify-content-between align-items-center\"],[12],[1,\"\\n                                    \"],[10,\"h3\"],[14,0,\"mb-0\"],[12],[1,[30,1,[\"food\",\"name\"]]],[13],[1,\"\\n                                    \"],[10,1],[12],[1,\"$\"],[1,[30,1,[\"food\",\"price\"]]],[13],[1,\"\\n                                \"],[13],[1,\"\\n                                    \"],[10,1],[12],[1,\"Quantity: \"],[1,[30,1,[\"quantity\"]]],[13],[1,\"\\n                            \"],[13],[1,\"\\n\"]],[1]],null],[1,\"                        \"],[13],[1,\"\\n\"]],[]],[[[1,\"                        \"],[10,2],[12],[1,\"No details found for this order.\"],[13],[1,\"\\n\"]],[]]],[1,\"                    \"],[13],[1,\"\\n                \"],[13],[1,\"\\n\\n\"],[1,\"            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13]],[\"item\"],false,[\"page-title\",\"div\",\"h1\",\"h2\",\"if\",\"ul\",\"each\",\"-track-array\",\"h3\",\"span\",\"p\"]]",
    "moduleName": "restaurant/templates/orderdetails.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/templates/register", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{!-- breadcrumb-section --}}
  <div class="breadcrumb-section breadcrumb-bg">
      <div class="container">
          <div class="row">
              <div class="col-lg-8 offset-lg-2 text-center">
                  <div class="breadcrumb-text">
                      <h1>Register</h1>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {{!-- end breadcrumb section --}}
  
  {{!-- registration section --}}
  <div class="login-section mt-5 mb-5">
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-6">
                  <h4 class="card-title mb-4 text-center">Sign Up</h4>
                  <form {{ on "submit" this.register }}>
                      <div class="form-group">
                          <label for="email">Email:</label>
                          <input type="email" name="email" class="form-control" {{ on "change" (fn this.update "email" )
                              }} placeholder="Enter your email">
                      </div>
                      <div class="form-group mt-4">
                          <label for="text">Address:</label>
                          <input type="text" name="text" class="form-control" {{ on "change" (fn this.update "address" )
                              }} placeholder="Enter your address">
                      </div>
                      <div class="form-group mt-4">
                          <label for="password">Password:</label>
                          <input type="password" name="password" class="form-control" {{ on "change" (fn
                              this.update "password" ) }} placeholder="Enter your password">
                      </div>
                      <button type="submit" class="btn btn-primary btn-block mt-4">Register</button>
                  </form>
              </div>
              {{#if this.error}}
              <div class="alert alert-danger mt-2" role="alert">
                  <strong>{{this.error}}</strong>
              </div>
              {{/if}}
          </div>
          <div class="container mt-5">
              <div class="row">
                  <div class="col-md-12 text-center">
                      Already have an account? <LinkTo @route="login">Login Now</LinkTo>
                  </div>
              </div>
          </div>
      </div>
  </div>
  {{!-- end registration section --}}
  */
  {
    "id": "VnIjHrL4",
    "block": "[[[10,0],[14,0,\"breadcrumb-section breadcrumb-bg\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-lg-8 offset-lg-2 text-center\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"breadcrumb-text\"],[12],[1,\"\\n                    \"],[10,\"h1\"],[12],[1,\"Register\"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[1,\"\\n\"],[10,0],[14,0,\"login-section mt-5 mb-5\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"row justify-content-center\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"col-md-6\"],[12],[1,\"\\n                \"],[10,\"h4\"],[14,0,\"card-title mb-4 text-center\"],[12],[1,\"Sign Up\"],[13],[1,\"\\n                \"],[11,\"form\"],[4,[38,4],[\"submit\",[30,0,[\"register\"]]],null],[12],[1,\"\\n                    \"],[10,0],[14,0,\"form-group\"],[12],[1,\"\\n                        \"],[10,\"label\"],[14,\"for\",\"email\"],[12],[1,\"Email:\"],[13],[1,\"\\n                        \"],[11,\"input\"],[24,3,\"email\"],[24,0,\"form-control\"],[24,\"placeholder\",\"Enter your email\"],[24,4,\"email\"],[4,[38,4],[\"change\",[28,[37,7],[[30,0,[\"update\"]],\"email\"],null]],null],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[10,0],[14,0,\"form-group mt-4\"],[12],[1,\"\\n                        \"],[10,\"label\"],[14,\"for\",\"text\"],[12],[1,\"Address:\"],[13],[1,\"\\n                        \"],[11,\"input\"],[24,3,\"text\"],[24,0,\"form-control\"],[24,\"placeholder\",\"Enter your address\"],[24,4,\"text\"],[4,[38,4],[\"change\",[28,[37,7],[[30,0,[\"update\"]],\"address\"],null]],null],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[10,0],[14,0,\"form-group mt-4\"],[12],[1,\"\\n                        \"],[10,\"label\"],[14,\"for\",\"password\"],[12],[1,\"Password:\"],[13],[1,\"\\n                        \"],[11,\"input\"],[24,3,\"password\"],[24,0,\"form-control\"],[24,\"placeholder\",\"Enter your password\"],[24,4,\"password\"],[4,[38,4],[\"change\",[28,[37,7],[[30,0,[\"update\"]],\"password\"],null]],null],[12],[13],[1,\"\\n                    \"],[13],[1,\"\\n                    \"],[10,\"button\"],[14,0,\"btn btn-primary btn-block mt-4\"],[14,4,\"submit\"],[12],[1,\"Register\"],[13],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"],[41,[30,0,[\"error\"]],[[[1,\"            \"],[10,0],[14,0,\"alert alert-danger mt-2\"],[14,\"role\",\"alert\"],[12],[1,\"\\n                \"],[10,\"strong\"],[12],[1,[30,0,[\"error\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"container mt-5\"],[12],[1,\"\\n            \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"col-md-12 text-center\"],[12],[1,\"\\n                    Already have an account? \"],[8,[39,11],null,[[\"@route\"],[\"login\"]],[[\"default\"],[[[[1,\"Login Now\"]],[]]]]],[1,\"\\n                \"],[13],[1,\"\\n            \"],[13],[1,\"\\n        \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"div\",\"h1\",\"h4\",\"form\",\"on\",\"label\",\"input\",\"fn\",\"button\",\"if\",\"strong\",\"link-to\"]]",
    "moduleName": "restaurant/templates/register.hbs",
    "isStrictMode": false
  });
});
;define("restaurant/transforms/boolean", ["exports", "@ember/debug", "@ember-data/serializer/-private"], function (_exports, _debug, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the BooleanTransform. Use `export { BooleanTransform as default } from '@ember-data/serializer/transform';` in app/transforms/boolean.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("restaurant/transforms/date", ["exports", "@ember/debug", "@ember-data/serializer/-private"], function (_exports, _debug, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the DateTransform. Use `export { DateTransform as default } from '@ember-data/serializer/transform';` in app/transforms/date.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("restaurant/transforms/number", ["exports", "@ember/debug", "@ember-data/serializer/-private"], function (_exports, _debug, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the NumberTransform. Use `export { NumberTransform as default } from '@ember-data/serializer/transform';` in app/transforms/number.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("restaurant/transforms/string", ["exports", "@ember/debug", "@ember-data/serializer/-private"], function (_exports, _debug, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/debug",0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
  (true && !(false) && (0, _debug.deprecate)("You are relying on ember-data auto-magically installing the StringTransform. Use `export { StringTransform as default } from '@ember-data/serializer/transform';` in app/transforms/string.js instead", false, {
    id: 'ember-data:deprecate-legacy-imports',
    for: 'ember-data',
    until: '6.0',
    since: {
      enabled: '5.2',
      available: '5.2'
    }
  }));
});
;define("restaurant/utils/inject", ["exports", "ember-simple-auth/utils/inject"], function (_exports, _inject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inject.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/utils/inject"eaimeta@70e063a35619d71f
});
;define("restaurant/utils/is-fastboot", ["exports", "ember-simple-auth/utils/is-fastboot"], function (_exports, _isFastboot) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isFastboot.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/utils/is-fastboot"eaimeta@70e063a35619d71f
});
;define("restaurant/utils/location", ["exports", "ember-simple-auth/utils/location"], function (_exports, _location) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _location.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/utils/location"eaimeta@70e063a35619d71f
});
;define("restaurant/utils/objects-are-equal", ["exports", "ember-simple-auth/utils/objects-are-equal"], function (_exports, _objectsAreEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _objectsAreEqual.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-simple-auth/utils/objects-are-equal"eaimeta@70e063a35619d71f
});
;

;define('restaurant/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("restaurant/app")["default"].create({"name":"restaurant","version":"0.0.0"});
          }
        
//# sourceMappingURL=restaurant.map
