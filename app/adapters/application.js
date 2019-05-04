import DS from 'ember-data';
import config from 'autofitplan/config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: config.API.host,
});
