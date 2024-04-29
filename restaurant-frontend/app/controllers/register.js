import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RegisterController extends Controller {
  @service router;
  @tracked error;
  @tracked email;
  @tracked password;
  @tracked address;

  @action
  async register(event) {
    event.preventDefault();
    const url = 'http://localhost:8080/api/customers'; // Replace with your actual API endpoint

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          address: this.address,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      this.router.transitionTo('login'); // Redirect to login route upon successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      this.error = 'Failed to register'; // Update error handling message
    }
  }

  @action
  update(attr, event) {
    this[attr] = event.target.value;
  }
}
