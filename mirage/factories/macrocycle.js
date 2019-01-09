import {Factory} from 'ember-cli-mirage';

const broNames = ['Dan', 'Sleighter', 'Valkrie', 'Odin'];
const bodyParts = ['Arm', 'Leg', 'Chest', 'Ab'];
const extremeAdjs = [
  'Blaster',
  'Killer',
  'Pump',
  'Builder',
  'Rehab',
  'German Volume',
  'Power',
  'Bodybuilding',
];

let circlularReturn = function(array, index) {
  return array[index % array.length];
};

let nameBuilder = function(index) {
  let broName = circlularReturn(broNames, index);
  let bodyPart = circlularReturn(bodyParts, index);
  let extremeAdj = circlularReturn(extremeAdjs, index);

  return `${broName}'s ${bodyPart} ${extremeAdj}`;
};

export default Factory.extend({
  name(i) {
    return nameBuilder(i);
  },
  slug(i) {
    return nameBuilder(i)
      .replace(/ /g, '-')
      .toLowerCase()
      .replace(/'/g, '');
  },
});
