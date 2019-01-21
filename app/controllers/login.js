import Controller from '@ember/controller';
import {set} from '@ember/object';
import {inject as service} from '@ember/service';

export default Controller.extend({
  magicLink: service(),

  actions: {
    submitLoginForm(e) {
      e.preventDefault();

      let formElements = [...e.currentTarget.elements].map(v => {
        return {name: v.name, value: v.value};
      });

      let email = formElements.find(el => el.name === 'email').value;
      let that = this;

      this.get('magicLink')
        .sendMagicLink.perform(email)
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
