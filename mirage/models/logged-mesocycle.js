import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  loggedMacrocycle: belongsTo(),
  mesocycle: belongsTo(),
  loggedMicrocycles: hasMany(),
});
