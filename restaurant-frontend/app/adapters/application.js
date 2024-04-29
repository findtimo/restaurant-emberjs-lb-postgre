import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  host = 'http://localhost:8080';
  namespace = 'api';

  @computed('session.isAuthenticated', 'session.data.authenticated.token')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers['token'] = this.session.data.authenticated.token;
    }
    return headers;
  }
}
