import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  tagName: '',
  router: service(),
  actions: {
    goToProgram(event) {
      let slug = event.target.value;
      if (!slug) {
        return;
      }
      this.get('router').transitionTo('program', slug);
    },
  },
});
