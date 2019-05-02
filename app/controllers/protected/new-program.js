import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    startNewProgram(macrocycle) {
      let newProgram = this.store.createRecord('logged-macrocycle', {
        macrocycle,
      });

      return newProgram.save();
    },
  },
});
