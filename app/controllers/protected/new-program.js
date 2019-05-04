import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  currentUser: service(),

  actions: {
    startNewProgram(macrocycle) {
      let newProgram = this.store.createRecord('logged-macrocycle', {
        macrocycle,
      });

      let transitionToNewProgram = loggedMacrocycle => {
        this.transitionToRoute('protected.program', loggedMacrocycle.id);
      };

      let currentUser = get(this, 'currentUser');

      newProgram
        .save()
        .then(transitionToNewProgram)
        .then(() => currentUser.reloadUser())
        .catch(error => {
          console.error(error);
        });
    },
  },
});
