import {Model, belongsTo} from 'ember-cli-mirage';

export default Model.extend({
  performanceTest: belongsTo(),
  exercise: belongsTo(),
  loggedSession: belongsTo(),
});
