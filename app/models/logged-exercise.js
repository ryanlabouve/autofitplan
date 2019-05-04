import DS from 'ember-data';
const {belongsTo, attr} = DS;

export default DS.Model.extend({
  exercise: belongsTo(),
  loggedSession: belongsTo(),
  weight: attr('number'),
  name: attr('string'),
  completed: attr('boolean'),
  skipped: attr('boolean'),
  failed: attr('boolean'),
});
