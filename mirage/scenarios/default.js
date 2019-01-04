export default function(server) {
  let ryan = server.create('user', {
    name: 'ryan',
  });

  let ryanMacrocycle = server.create('macrocycle', {
    user: ryan,
    name: 'Bodybuilding Plan Intermediate',
    slug: 'bodybuilding-plan-intermediate',
  });

  let ryanMesocycle = server.create('mesocycle', {
    name: 'Main block',
    macrocycle: ryanMacrocycle,
  });

  let microcycle = server.create('microcycle', {
    name: 'Main week',
    days: 7,
    mesocycle: ryanMesocycle,
  });

  // ----------------------
  // Day 1
  // ----------------------

  let day1 = server.create('session', {
    microcycle,
    name: 'Day 1, Lower',
  });

  let loggedSession = server.create('loggedSession', {
    session: day1,
    week: 1,
  });

  let exercise = server.create('exercise', {
    session: day1,
    code: 'sq_variant',
    sets: 4,
    repsLow: 3,
    repsHigh: 5,
    percentRM: 85,
    rpe: 8,
  });

  server.create('loggedExercise', {
    loggedSession,
    exercise,
    weight: 100,
  });

  server.create('exercise', {
    session: day1,
    code: 'dl_variant',
    sets: 4,
    repsLow: 3,
    repsHigh: 5,
    percentRM: 85,
    rpe: 8,
  });

  server.create('exercise', {
    session: day1,
    code: 'sl_variant',
    sets: 3,
    repsLow: 6,
    repsHigh: 8,
    percentRM: null,
    rpe: 8,
  });

  server.create('exercise', {
    session: day1,
    code: 'leg_curl',
    sets: 3,
    repsLow: 6,
    repsHigh: 8,
    percentRM: null,
    rpe: 8,
  });

  server.create('exercise', {
    session: day1,
    code: 'st_calf',
    sets: 3,
    repsLow: 6,
    repsHigh: 8,
    percentRM: null,
    rpe: 8,
  });

  // ----------------------
  // Day 2
  // ----------------------

  let day2 = server.create('session', {
    microcycle,
    name: 'Day 2, Upper',
  });

  server.create('exercise', {
    session: day2,
    code: 'hor_push',
    sets: 4,
    reps_low: 3,
    reps_high: 5,
    percent_rm: 85,
    rpe: 8,
  });

  server.create('exercise', {
    session: day2,
    code: 'hor_pull',
    sets: 4,
    reps_low: 4,
    reps_high: 6,
    percent_rm: null,
    rpe: 8,
  });

  server.create('exercise', {
    session: day2,
    code: 'ver_push',
    sets: 3,
    reps_low: 5,
    reps_high: 7,
    percent_rm: 80,
    rpe: 8,
  });

  server.create('exercise', {
    session: day2,
    code: 'ver_pull',
    sets: 3,
    reps_low: 6,
    reps_high: 8,
    percent_rm: null,
    rpe: 8,
  });

  server.create('exercise', {
    session: day2,
    code: 'triceps',
    sets: 3,
    reps_low: 8,
    reps_high: 12,
    percent_rm: null,
    rpe: 8,
  });

  server.create('exercise', {
    session: day2,
    code: 'biceps',
    sets: 3,
    reps_low: 8,
    reps_high: 12,
    percent_rm: null,
    rpe: 8,
  });
}
