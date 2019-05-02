import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  email: attr('string'),
  belongsTo: attr('profile', {async: true}),
  profile: DS.belongsTo('profile', {async: false}),
});
