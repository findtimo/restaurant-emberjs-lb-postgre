// app/routes/orderdetails.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrderdetailsRoute extends Route {
  @service config;
  @service session;

  async model(params) {
    try {
      const filter = {
        where: { orderId: params.order_id }, // Filter to match orderId
        include: [{ relation: 'food' }] // Include related food details
      };

      let response = await fetch(`${this.config.host}/api/orderfoods?filter=${encodeURIComponent(JSON.stringify(filter))}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.session.data.authenticated.token}`,
        },
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
}
