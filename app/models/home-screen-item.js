import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  duty: DS.attr('string'),

  loggedMacrocycle: DS.belongsTo('logged-macrocycle', {async: false}),
  performanceTest: DS.belongsTo('performance-test', {async: false}),
  loggedSession: DS.belongsTo('logged-session', {async: false}),
  dailyMeasurement: DS.belongsTo('daily-measurement', {async: false}),
});
