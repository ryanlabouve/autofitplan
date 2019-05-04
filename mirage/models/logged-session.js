import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  session: belongsTo(),
  loggedMicrocycle: belongsTo(),
  loggedExercises: hasMany(),
});
