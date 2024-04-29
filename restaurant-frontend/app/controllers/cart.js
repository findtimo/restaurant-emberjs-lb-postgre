import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class CartController extends Controller {
  @service session;
  @service config;
  @service('shopping-cart') cart;

  get subtotal() {
    return this.cart.itemList.reduce(
      (acc, item) => acc + item.price * item.count,
      0,
    );
  }

  get tax() {
    return 0.09 * this.subtotal;
  }

  get total() {
    const rawTotal = this.subtotal + this.tax;
    return rawTotal.toFixed(2);
  }

  @action
  updateItemCount(item, event) {
    const newCount = parseInt(event.target.value, 10);
    if (!isNaN(newCount) && newCount >= 0) {
      item.count = newCount;
    } else {
      item.count = 0;
    }
    this.cart.saveCart();
  }

  @action
  checkout() {
    const orderData = {
      placeDate: new Date().toISOString(),
      customerId: this.session.data.authenticated.userId,
      totalPrice: this.subtotal + this.tax,
    };

    console.log(this.session.data.authenticated.token);

    fetch(`${this.config.host}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.session.data.authenticated.token}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((orderResponse) => {
        if (!orderResponse.id) {
          throw new Error('Order creation failed');
        }
        const orderId = orderResponse.id;

        const orderFoodPromises = this.cart.itemList.map((item) => {
          const orderFoodData = {
            orderId: orderId,
            foodId: item.id,
            quantity: item.count,
          };
          // console.log(JSON.stringify(orderFoodData))

          return fetch(`${this.config.host}/api/orderfoods`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${this.session.data.authenticated.token}`,
            },
            body: JSON.stringify(orderFoodData),
          });
        });

        return Promise.all(orderFoodPromises);
      })
      .then((orderFoodResponses) =>
        Promise.all(orderFoodResponses.map((res) => res.json())),
      )
      .then(() => {
        alert('Checkout successful!');
        this.cart.empty(); // Empty the cart after successful checkout
      })
      .catch((error) => {
        alert(`Checkout failed: ${error.message}`);
      });
  }

  @action
  removeFromCart(item) {
    this.cart.removeItem(item);
  }
}
