import Controller from '@ember/controller';

const RYANS_PROGRAM = {
  title: "Ryan's Program",
};
const ROBYNS_PROGRAM = {
  title: "Ryan's Program",
};

const PROGRAMS = [RYANS_PROGRAM, ROBYNS_PROGRAM];

export default Controller.extend({
  programs: PROGRAMS,

  actions: {
    goToProgram(event) {
      let slug = event.target.value;
      this.transitionToRoute('program', {
        slug,
      });
    },
  },
});
