import DS from 'ember-data';
const {Model} = DS;

export default Model.extend({
  setNumber: DS.attr('number'),
  weight: DS.attr('number'),
  reps: DS.attr('number'),
  repsLow: DS.attr('number'),
  repsHigh: DS.attr('number'),
  rpe: DS.attr('number'),

  completed: DS.attr('boolean'),
  skipped: DS.attr('boolean'),
  failed: DS.attr('boolean'),

  exercise: DS.belongsTo(),
  loggedExercise: DS.belongsTo(),
});
