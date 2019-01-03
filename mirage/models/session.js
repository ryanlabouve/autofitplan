import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  microcycle: belongsTo(),
  exercises: hasMany(),
});
