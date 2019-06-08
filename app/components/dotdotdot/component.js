import Component from '@ember/component';
import {set} from '@ember/object';
import fade from 'ember-animated/transitions/fade';

export default Component.extend({
  actions: {
    async thenClose(fn) {
      await fn();
      set(this, 'showOptions', false);
    },
  },
  transition: fade,
});
