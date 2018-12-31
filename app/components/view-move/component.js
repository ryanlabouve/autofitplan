import Component from '@ember/component';
import {computed, get} from '@ember/object';

const EXERCISE_MAP = {
  sq_variant: {
    name: 'Squat Variation',
  },
  dl_variant: {
    name: 'Deadlift Variation',
  },
  sl_variant: {
    name: 'Single-leg Variation',
  },
  leg_curl: {
    name: 'Leg Curl',
  },
  st_calf: {
    name: 'Seated Calf',
  },
  hor_push: {
    name: 'Horizontal Push',
  },
  hor_pull: {
    name: 'Horizontal Pull',
  },
  ver_push: {
    name: 'Vertical Push',
  },
  ver_pull: {
    name: 'Vertical Pull',
  },
  biceps: {
    name: 'Biceps',
  },
  triceps: {
    name: 'Triceps',
  },
  hh_variant: {
    name: 'Hip Hinge',
  },
  lp_variant: {
    name: 'Leg-press Variation',
  },
  leg_ext: {
    name: 'Leg Extension',
  },
  se_calf: {
    name: 'Seated Calf',
  },
  dips: {
    name: 'Dips',
  },
  wt_b_ext: {
    name: 'Weighted Back Extension',
  },
  face_pull: {
    name: 'Face Pull',
  },
};

export default Component.extend({
  name: computed('move.code', function() {
    return EXERCISE_MAP[get(this, 'move.code')].name;
  }),
});
