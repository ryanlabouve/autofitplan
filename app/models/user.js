import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  email: attr('string'),
  profile: DS.belongsTo('profile', {async: false}),

  currentTimeZone: attr('string'),
});
