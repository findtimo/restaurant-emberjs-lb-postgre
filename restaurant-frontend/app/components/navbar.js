import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NavbarComponent extends Component {
  @service session;

  @action
  logout() {
    this.session
      .invalidate()
      .then(() => {
        this.router.transitionTo('home'); // Redirect to the home route after logout
      })
      .catch((error) => {
        console.error('Logout failed:', error); // Handle errors
      });
  }

  get isAuthenticated() {
    return this.session.isAuthenticated;
  }
}
