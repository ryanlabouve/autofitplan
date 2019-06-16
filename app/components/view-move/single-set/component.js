import Component from '@ember/component';
import {set} from '@ember/object';

export default Component.extend({
  tagName: '',
  changeShowing(name) {
    if (this.currentlyEditing === name) {
      set(this, 'currentlyEditing', null);
    } else {
      set(this, 'currentlyEditing', name);
    }
  },
});
