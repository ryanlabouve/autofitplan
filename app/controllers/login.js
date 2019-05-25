/* global window, grecaptcah */
import Controller from '@ember/controller';
import {get, set} from '@ember/object';
import {inject as service} from '@ember/service';
import config from 'autofitplan/config/environment';

const RECAPTCHA_KEY = '6LdKZKUUAAAAAMm1y1wfXzEcbdXPMbUKXbEDWkBg';

export default Controller.extend({
  magicLink: service(),

  _loadRecaptcha() {
    if (config.environment !== 'testing') {
      let recaptcha = document.createElement('script');
      recaptcha.setAttribute = 'text/javascript';
      // async defer>
      recaptcha.src = `https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit`;
      recaptcha.onload = this.afterRecaptchaLoaded.bind(this);
      let head = document.querySelector('head');
      head.appendChild(recaptcha);
    }
  },

  afterRecaptchaLoaded() {
    let verifyCallback = function(key) {
      set(this, 'recaptchaKey', key);
    };
    window &&
      window.grecaptcha &&
      window.grecaptcha.ready(() => {
        grecaptcha.render('notdoctor', {
          sitekey: RECAPTCHA_KEY,
          callback: verifyCallback.bind(this),
        });
      });
  },

  init() {
    this._super(...arguments);
    this._loadRecaptcha();
  },

  actions: {
    submitLoginForm(e) {
      e.preventDefault();

      let formElements = [...e.currentTarget.elements].map(v => {
        return {name: v.name, value: v.value};
      });

      let email = formElements.find(el => el.name === 'email').value;
      let recaptchaKey = get(this, 'recaptchaKey');
      let that = this;

      this.get('magicLink')
        .sendMagicLink.perform({email, recaptchaKey})
        .then(json => {
          if (!json.data.email) {
            set(this, 'error', json.error);
          } else {
            set(that, 'email', json.data.email);
          }
        })
        .catch(e => {
          console.error(e);
          set(this, 'error', e);
        });
    },
  },
});
