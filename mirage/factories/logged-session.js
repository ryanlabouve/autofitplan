import {Factory} from 'ember-cli-mirage';

export default Factory.extend({
  week(i) {
    return i + 1;
  },
});
