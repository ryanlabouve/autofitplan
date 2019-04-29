import DS from 'ember-data';

const {belongsTo, hasMany} = DS;

export default DS.Model.extend({
  mesocycle: belongsTo('mesocycle', {async: false}),
  loggedMicrocycles: hasMany('logged-microcycle', {async: false}),
});
