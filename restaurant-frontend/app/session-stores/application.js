// app/session-stores/application.js
import CookieStore from 'ember-simple-auth/session-stores/cookie';

export default class ApplicationSessionStore extends CookieStore {
  cookieName = 'ember_simple_auth-session'; // This must match the cookie name you see in the browser.
  secure = true;
  sameSite = 'Strict';
}
