// const BB_D1 = {};
// const BB_D2 = {};
// const BB_D3 = {};
// const BB_D4 = {};
// const BB_D5 = {};
//
// const PLAN_BB_INTERMEDIATE_BLOCK_A = [BB_D1, BB_D2, BB_D3, BB_D4, BB_D5];
//
const PLAN_BB_INTERMEDIATE = {
  weeks: 12,
  week: [
    {
      name: 'Day 1, Lower',
      moves: [
        {
          code: 'sq_variant',
          sets: 4,
          reps_low: 3,
          reps_high: 5,
          percent_rm: 85,
          rpe: 8,
        },
        {
          code: 'dl_variant',
          sets: 4,
          reps_low: 3,
          reps_high: 5,
          percent_rm: 85,
          rpe: 8,
        },
        {
          code: 'sl_variant',
          sets: 3,
          reps_low: 6,
          reps_high: 8,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'leg_curl',
          sets: 3,
          reps_low: 6,
          reps_high: 8,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'st_calf',
          sets: 3,
          reps_low: 6,
          reps_high: 8,
          percent_rm: null,
          rpe: 8,
        },
      ],
    },
    {
      name: 'Day 2, Upper',
      moves: [
        {
          code: 'hor_push',
          sets: 4,
          reps_low: 3,
          reps_high: 5,
          percent_rm: 85,
          rpe: 8,
        },
        {
          code: 'hor_pull',
          sets: 4,
          reps_low: 4,
          reps_high: 6,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'ver_push',
          sets: 3,
          reps_low: 5,
          reps_high: 7,
          percent_rm: 80,
          rpe: 8,
        },
        {
          code: 'triceps',
          sets: 3,
          reps_low: 8,
          reps_high: 12,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'biceps',
          sets: 3,
          reps_low: 8,
          reps_high: 12,
          percent_rm: null,
          rpe: 8,
        },
      ],
    },
    {
      name: 'Day 3, Lower',
      moves: [
        {
          code: 'hh_variant',
          sets: 3,
          reps_low: 6,
          reps_high: 8,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'lp_variant',
          sets: 3,
          reps_low: 6,
          reps_high: 8,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'leg_ext',
          sets: 3,
          reps_low: 8,
          reps_high: 12,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'se_calf',
          sets: 5,
          reps_low: 12,
          reps_high: 15,
          percent_rm: null,
          rpe: 8,
        },
      ],
    },
    {
      name: 'Day 4, Push',
      moves: [
        {
          code: 'ver_push',
          sets: 3,
          reps_low: 6,
          reps_high: 8,
          percent_rm: 80,
          rpe: 8,
        },
        {
          code: 'hor_push',
          sets: 3,
          reps_low: 6,
          reps_high: 8,
          percent_rm: 80,
          rpe: 8,
        },
        {
          code: 'dips',
          sets: 3,
          reps_low: 8,
          reps_high: 12,
          percent_rm: null,
          rpe: 8,
        },
      ],
    },
    {
      name: 'Day 5, Pull',
      moves: [
        {
          code: 'hor_pull',
          sets: 3,
          reps_low: 6,
          reps_high: 8,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'ver_pull',
          sets: 3,
          reps_low: 6,
          reps_high: 8,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'wt_b_ext',
          sets: 3,
          reps_low: 8,
          reps_high: 12,
          percent_rm: null,
          rpe: 8,
        },
        {
          code: 'face_pull',
          sets: 2,
          reps_low: 12,
          reps_high: 15,
          percent_rm: null,
          rpe: 8,
        },
      ],
    },
  ],
};

const RYANS_PROGRAM = {
  name: "Ryan's Program",
  slug: 'ryans-program',
  plan: PLAN_BB_INTERMEDIATE,
};

const ROBYNS_PROGRAM = {
  name: "Robyn's Program",
  slug: 'robyns-program',
  plan: PLAN_BB_INTERMEDIATE,
};

const PROGRAMS = [RYANS_PROGRAM, ROBYNS_PROGRAM];

export default PROGRAMS;
