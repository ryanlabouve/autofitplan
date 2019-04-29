import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  microcycle: belongsTo(),
  loggedMesocycle: belongsTo(),
  loggedSessions: hasMany(),
});
