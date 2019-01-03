import {Model, belongsTo, hasMany} from 'ember-cli-mirage';

export default Model.extend({
  mesocycle: belongsTo(),
  sessions: hasMany(),
});
