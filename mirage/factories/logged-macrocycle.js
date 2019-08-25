import {Factory} from 'ember-cli-mirage';

export default Factory.extend({
  archived: function() {
    return false;
  },
});
