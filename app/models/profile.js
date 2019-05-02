import DS from 'ember-data';

export default DS.Model.extend({
  needsNewProgram: DS.attr('boolean'),
  needsNewPerformanceTest: DS.attr('boolean'),
  user: DS.belongsTo('user', {async: true}),
});
