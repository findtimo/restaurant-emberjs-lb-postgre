import EmberRouter from '@ember/routing/router';
import config from 'restaurant/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' });
  this.route('menu');
  this.route('menu/item', { path: '/menu/:item_id' });
  this.route('customer-portal');
  this.route('cart');
  this.route('not-found', { path: '/*path' });
  this.route('login');
  this.route('register');
  this.route('history');
  this.route('orderdetails', { path: '/orderdetails/:order_id' });
  
});
