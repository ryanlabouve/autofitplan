import DS from 'ember-data';
const {Model} = DS;

export default Model.extend({
  totalWorkouts: DS.attr('number'),
  poundsLifted: DS.attr('string'),
  milesRun: DS.attr('number'),
});
