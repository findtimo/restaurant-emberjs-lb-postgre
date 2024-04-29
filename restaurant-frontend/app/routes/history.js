import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class HistoryRoute extends Route {
  @service config;
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    try {
      // Fetch order data from the API
      let response = await fetch(
        `${this.config.host}/api/customers/${this.session.data.authenticated.userId}/orders/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${this.session.data.authenticated.token}`,
          },
        },
      );

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
}
