import {Promise} from 'rsvp';
import Base from 'ember-simple-auth/authenticators/base';
import config from 'autofitplan/config/environment';
import fetch from 'fetch';

export default Base.extend({
  getTokenLink() {
    return `${config.API.host}/api/token`;
  },

  restore(data) {
    // TODO: refactor this to DRY with services/magic-link
    data = {data};
    return new Promise((resolve, reject) => {
      return fetch(this.getTokenLink(), {
        method: 'post',
        body: JSON.stringify(data),
      })
        .then(response => {
          return response.json().then(json => resolve(json));
        })
        .catch(error => {
          return reject(error);
        });
    });
  },

  authenticate(params) {
    // TODO: handle error messages more consistently
    if (params.data && params.data.token) {
      return Promise.resolve({token: params.data.token});
    } else {
      return Promise.reject(params);
    }
  },

  invalidate(data) {
    debugger;
  },
});
