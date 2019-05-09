import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  session: belongsTo(),
  performanceTest: belongsTo(),
  loggedExercise: hasMany(),
});
