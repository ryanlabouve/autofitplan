import DS from 'ember-data';
const {belongsTo, hasMany} = DS;

export default DS.Model.extend({
  user: belongsTo('user', {async: false}),
  exercises: hasMany('exercise', {async: false}),
  loggedExercises: hasMany('logged-exercise', {async: false}),
});
