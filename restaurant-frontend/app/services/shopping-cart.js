import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

class Item {
  id;
  count;
  name;
  image;
  price;

  constructor(item) {
    this.id = item.id;
    this.count = item.count;
    this.name = item.name;
    this.image = item.image;
    this.price = item.price;
  }
}

export default class ShoppingCartService extends Service {
  @tracked itemList = [];

  constructor() {
    super();
    this.loadCart();
  }

  loadCart() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.itemList = JSON.parse(storedCart).map((item) => new Item(item));
    }
  }

  addItem(item) {
    // console.log('Item received:', item);
    const existingItem = this.itemList.find((existingItem) => {
      return existingItem.name === item.name;
    });
    if (existingItem) {
      existingItem.count += 1;
    } else {
      this.itemList = [
        ...this.itemList,
        new Item({
          ...item,
          count: 1,
        }),
      ];
    }
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.itemList));
  }

  removeItem(itemToRemove) {
    this.itemList = this.itemList.filter((item) => item !== itemToRemove);
    this.saveCart();
  }

  empty() {
    this.itemList = [];
    this.saveCart();
  }
}
