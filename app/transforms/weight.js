import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return Number.parseInt(serialized).toFixed(2) || 0;
  },

  serialize(deserialized) {
    return deserialized;
  },
});
