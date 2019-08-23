import Component from '@ember/component';
import {set} from '@ember/object';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),

  actuallyDeleteProgram: task(function*() {
    let flashMessages = this.flashMessages;
    let loggedMacrocycle = this.homeScreenItem.loggedMacrocycle;
    set(this, 'showDeleteProgramModal', false);
    try {
      yield loggedMacrocycle.destroyRecord();
      flashMessages.success('Program deleted');
    } catch (e) {
      flashMessages.danger('Something went wrong!');
      console.error(e);
    }
  }),

  actions: {
    deleteProgram() {
      set(this, 'showMenu', false);
      set(this, 'showDeleteProgramModal', true);
    },

    cancelDeleteProgram() {
      set(this, 'showDeleteProgramModal', false);
    },

    archiveProgram() {
      set(this, 'showMenu', false);
      set(this, 'showDeleteProgramModal', true);
    },

    cancelArchiveProgram() {
      set(this, 'showDeleteProgramModal', false);
    },
  },
});
