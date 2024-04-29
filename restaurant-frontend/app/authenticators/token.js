import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default Base.extend({
  config: service(),
  session: service(),

  async restore(data) {
    let { token } = data;
    if (token) {
      return data;
    } else {
      console.log('Error');
      throw 'no valid session data';
    }
  },

  authenticate(email, password) {
    const url = `${this.config.host}/api/customers/login`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        return response.json();
      })
      .then((data) => {
        if (data.id) {
          // Rename 'id' to 'token' and structure it under the 'authenticated' key
          return {
            token: data.id,
            userId: data.userId,
          };
        } else {
          throw new Error('Token was not provided in the response');
        }
      });
  },

  invalidate() {
    const url = `${this.config.host}/api/customers/logout`;
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.session.data.authenticated.token}`,
      },
    });
  },
});
