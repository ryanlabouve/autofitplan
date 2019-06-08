import DS from 'ember-data';
const {Model} = DS;

export default Model.extend({
  exercise: DS.belongsTo(),
  loggedExercise: DS.belongsTo(),
});
