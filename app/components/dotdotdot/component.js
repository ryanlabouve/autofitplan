import Component from '@ember/component';
import {set} from '@ember/object';

export default Component.extend({
  actions: {
    async thenClose(fn) {
      await fn();
      set(this, 'showOptions', false);
    },
  },
});
