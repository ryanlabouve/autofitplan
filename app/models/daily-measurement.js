import DS from 'ember-data';

export default DS.Model.extend({
  homeScreenItems: DS.hasMany(),

  weight: DS.attr('weight'),
  calories: DS.attr('number'),
  protein: DS.attr('number'),
  fat: DS.attr('number'),
  carb: DS.attr('number'),
  // steps: DS.attr('number'),
  loggedOn: DS.attr('date', {
    defaultValue() {
      return new Date();
    },
  }),
});
