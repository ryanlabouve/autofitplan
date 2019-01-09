import {Factory} from 'ember-cli-mirage';

const EXERCISE_CODES = [
  'sq_variant',
  'dl_variant',
  'sl_variant',
  'leg_curl',
  'st_calf',
  'ver_pull',
  'ver_push',
  'hor_pull',
  'hor_push',
];

let randomElement = function(a) {
  return a[Math.floor(Math.random() * a.length)];
};

export default Factory.extend({
  code: () => {
    return randomElement(EXERCISE_CODES);
  },
});
