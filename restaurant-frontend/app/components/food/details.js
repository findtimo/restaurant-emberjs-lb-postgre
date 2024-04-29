import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ProductDetailsComponent extends Component {
  @service('shopping-cart') cart;

  @action
  addToCart() {
    const { id, name, image, price } = this.args;
    console.log('Item received:', this.args);
    this.cart.addItem({
      id: id,
      name,
      image: image,
      price: price,
    });
  }
}
