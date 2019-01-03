import DS from 'ember-data';

const {belongsTo, hasMany} = DS;

export default DS.Model.extend({
  macrocycle: belongsTo(),
  microcycles: hasMany(),
});
