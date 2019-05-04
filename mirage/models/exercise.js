import {Model, belongsTo} from 'ember-cli-mirage';

export default Model.extend({
  session: belongsTo(),
  performanceTest: belongsTo(),
  loggedExercise: belongsTo(),
});
