import DS from 'ember-data';

export default DS.Model.extend({
  loggedMacrocycle: DS.belongsTo('logged-macrocycle', {async: false}),
  performanceTest: DS.belongsTo('performance-test', {async: false}),
});
