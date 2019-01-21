import Service from '@ember/service';
import fetch from 'fetch';
import {task} from 'ember-concurrency';
import config from 'autofitplan/config/environment';

export default Service.extend({
  getAuthLink() {
    return `${config.API.host}/api/login`;
  },
  sendMagicLink: task(function*(email) {
    let data = {email};

    try {
      let res = yield fetch(this.getAuthLink(), {
        method: 'post',
        body: JSON.stringify(data),
      });
      let json = yield res.json();
      return json.email;
    } catch (e) {
      throw e;
    }
  }),
});
