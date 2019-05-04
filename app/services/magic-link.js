import Service from '@ember/service';
import fetch from 'fetch';
import {task} from 'ember-concurrency';
import config from 'autofitplan/config/environment';
import {inject as service} from '@ember/service';

export default Service.extend({
  session: service(),

  getAuthLink() {
    return `${config.API.host}/api/login`;
  },
  getTokenLink() {
    return `${config.API.host}/api/token`;
  },
  sendMagicLink: task(function*(email) {
    let data = {data: {email}};

    try {
      let res = yield fetch(this.getAuthLink(), {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
      });
      let json = yield res.json();

      return json;
    } catch (e) {
      throw e;
    }
  }),

  authenticateMagicLink: task(function*(token) {
    let data = {data: {token}};
    try {
      let res = yield fetch(this.getTokenLink(), {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
      });
      let tokenJSON = yield res.json();

      // authenticate session
      let _authenticate = yield this.get('session')
        .authenticate('authenticator:magic-link', tokenJSON)
        .catch(reason => {
          return reason;
        });

      // get('session.data.authenticated.token')
    } catch (e) {
      throw e;
    }
  }),
});
