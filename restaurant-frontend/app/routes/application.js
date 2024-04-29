import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationRoute extends Route {
  @service session;

  beforeModel() {
    return this.session.setup().then(() => {
      // console.log('Session token:', this.session.data);
    });
  }
}
