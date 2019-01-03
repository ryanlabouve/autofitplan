import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  macrocycle: belongsTo(),
  microcycles: hasMany(),
});
