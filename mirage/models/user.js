import {Model, hasMany, belongsTo} from 'ember-cli-mirage';

export default Model.extend({
  macrocycles: hasMany(),
  profile: belongsTo(),
});
