import Component from '@ember/component';
import {computed, get, set} from '@ember/object';
import {task, timeout} from 'ember-concurrency';
import {inject as service} from '@ember/service';

const EXERCISE_MAP = {
  sq_variant: {
    name: 'Squat Variation',
    exercises: [
      {
        name: 'Back Squat',
      },
      {
        name: 'Goblet Squat',
      },
    ],
  },
  dl_variant: {
    name: 'Deadlift Variation',
    exercises: [
      {
        name: 'Deadlift',
      },
      {
        name: 'KettleBell Deadlift',
      },
    ],
  },
  sl_variant: {
    name: 'Single-leg Variation',
    exercises: [
      {
        name: 'Lunges',
      },
      {
        name: 'Single-leg Leg press',
      },
    ],
  },
  leg_curl: {
    name: 'Leg Curl',
    exercises: [
      {
        name: 'Seated Leg-Curl',
      },
      {
        name: 'Prone Leg-Curl',
      },
    ],
  },
  st_calf: {
    name: 'Standing Calf',
    exercises: [
      {
        name: 'Standing Calf Raise Machine',
      },
      {
        name: 'Leg Press Calf Raise',
      },
      {
        name: 'Smith Machine Calf Raise',
      },
      {
        name: 'Dumb-Bell Calf Raise',
      },
    ],
  },
  hor_push: {
    name: 'Horizontal Push',
    exercises: [
      {
        name: 'Bench Press',
      },
      {
        name: 'Dumb-bell Press',
      },
      {
        name: 'Inclined Bench Press',
      },
    ],
  },
  hor_pull: {
    name: 'Horizontal Pull',
    exercises: [
      {
        name: 'Seated Cable Row',
      },
      {
        name: 'Barbell Row',
      },
      {
        name: 'Chest Supported Db Row',
      },
    ],
  },
  ver_push: {
    name: 'Vertical Push',
    exercises: [
      {
        name: 'Overhead Press',
      },
      {
        name: 'Standing Dumbbell Press',
      },
      {
        name: 'Arnold Press',
      },
    ],
  },
  ver_pull: {
    name: 'Vertical Pull',
    exercises: [
      {
        name: 'Lat-Pull Down',
      },
      {
        name: 'Supinated Lat-Pull Down',
      },
      {
        name: 'Chin up (chains or bands)',
      },
      {
        name: 'Pull up (chains or bands)',
      },
    ],
  },
  biceps: {
    name: 'Biceps',
    exercises: [
      {
        name: 'Curl',
      },
      {
        name: 'Hammer Curl',
      },
      {
        name: 'Preacher Curl',
      },
    ],
  },
  triceps: {
    name: 'Triceps',
    exercises: [
      {
        name: 'Cable Pull-downs',
      },
      {
        name: 'Skull Crusher',
      },
    ],
  },
  hh_variant: {
    name: 'Hip Hinge',
    exercises: [
      {
        name: 'Barbell Hip Thrusts',
      },
      {
        name: 'Barbell Glute Bridge',
      },
      {
        name: 'Cable Pull Throughs',
      },
    ],
  },
  lp_variant: {
    name: 'Leg-press Variation',
    exercises: [
      {
        name: 'Hack Squat',
      },
      {
        name: 'Leg press',
      },
    ],
  },
  leg_ext: {
    name: 'Leg Extension',
    exercises: [
      {
        name: 'Leg Extension',
      },
    ],
  },
  se_calf: {
    name: 'Seated Calf',
    exercises: [
      {
        name: 'Stead Calf Raise Machine',
      },
    ],
  },
  dips: {
    name: 'Dips',
    exercises: [
      {
        name: 'Dips',
      },
      {
        name: 'Dip Machine',
      },
    ],
  },
  wt_b_ext: {
    name: 'Weighted Back Extension',
    exercises: [
      {
        name: 'Weighted Back Extension',
      },
    ],
  },

  flys: {
    name: 'Weighted Back Extension',
    exercises: [
      {
        name: 'Pec Deck',
      },
      {
        name: 'Dumbbell Flys',
      },
    ],
  },

  face_pull: {
    name: 'Face Pull',
    exercises: [
      {
        name: 'High Face Pull',
      },
      {
        name: 'Low Face Pull',
      },
    ],
  },
  inc_push: {
    name: 'Inclined Push',
    exercises: [
      {
        name: 'Inclined Barbell Bench',
      },
      {
        name: 'Inclined Dumbbell Bench',
      },
    ],
  },
};

export default Component.extend({
  loggedExerciseService: service('logged-exercise'),
  rawExercise: computed('exercise.code', function() {
    return EXERCISE_MAP[get(this, 'exercise.code')];
  }),

  didInsertElement() {
    set(
      this,
      'selectedExercise',
      get(this, 'rawExercise.exercises.firstObject'),
    );
  },

  name: computed('exercise.code', function() {
    return get(this, 'rawExercise').name;
  }),

  updateLoggedExercise: task(function*(loggedExercise, weight) {
    yield timeout(300);
    yield get(this, 'loggedExerciseService').updateLoggedExercise(
      loggedExercise,
      {
        weight,
      },
    );
  }).restartable(),

  updateLoggedExerciseName: task(function*(name) {
    yield timeout(300);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('name', name);
      loggedExercise.save();
    }
  }),
});
