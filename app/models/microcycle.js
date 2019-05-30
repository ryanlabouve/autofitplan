import DS from 'ember-data';
const {hasMany, belongsTo} = DS;

export default DS.Model.extend({
  mesocycle: belongsTo('mesocycle', {async: false}),
  sessions: hasMany(),
  timesToRepeat: DS.attr('number'),
});
