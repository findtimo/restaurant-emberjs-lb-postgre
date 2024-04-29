import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MenuRoute extends Route {
  @service store;
  // model(params) {
  //     const { item_id } = params;
  //     return item_id;
  // }

  async model() {
    return this.store.findAll('food');
  }
}
