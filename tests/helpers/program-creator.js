import moment from 'moment';

let setupDefaultUser = server => {
  server.create('user', {
    name: 'ryan',
  });
};

let setupDefaultCycles = server => {
  let user = server.schema.users.find(1);
  let macrocycle = server.create('macrocycle', {
    user,
    name: "Ryan's Program",
    slug: 'ryans-program',
  });

  let mesocycle = server.create('mesocycle', {
    macrocycle,
  });

  let microcycle = server.create('microcycle', {
    mesocycle,
  });

  let sessionMonday = server.create('session', {
    name: 'Day 1, Lower',
    microcycle,
  });

  server.create('exercise', {
    session: sessionMonday,
    code: 'lp_variant',
    sets: 3,
    repsLow: 5,
    repsHigh: 8,
    percentRM: 80,
    rpe: 8,
  });

  server.create('macrocycle', {
    user,
    name: "Robyn's Program",
    slug: 'robyns-program',
  });

  let _mesocycle2 = server.create('mesocycle', {
    macrocycle,
  });

  let microcycle2 = server.create('microcycle', {
    mesocycle,
  });

  let sessionMonday2 = server.create('session', {
    name: 'Day 1, Lower (second)',
    microcycle: microcycle2,
  });

  server.create('exercise', {
    session: sessionMonday2,
    code: 'lp_variant',
    sets: 3,
    repsLow: 5,
    repsHigh: 8,
    percentRM: 80,
    rpe: 8,
  });
};

let setupDefaultPrograms = server => {
  setupDefaultUser(server);
  setupDefaultCycles(server);
};

let setupBasicProgram = server => {
  let user = server.create('user');
  let macrocycle = server.create('macrocycle', {user});
  let mesocycle = server.create('mesocycle', {macrocycle});
  let microcycle = server.create('microcycle', {mesocycle});

  let days = ['Monday', 'Wednesday', 'Friday'];

  days.forEach(day => {
    let session = server.create('session', {
      name: day,
      microcycle,
    });

    // create list for exercise
    server.createList('exercise', 10, {
      session: session,
    });
  });
};

let logSomeSessions = server => {
  if (!server.db.sessions.length) {
    throw 'asdfasdfasd';
  }

  let sessions = server.db.sessions;
  sessions.slice(0, 4).forEach(session => {
    let loggedSession = server.create('logged-session', {
      sessionId: session.id,
      endedAt: moment().format(),
      week: 1,
    });

    session.exerciseIds.map(exerciseId => {
      server.create('logged-exercise', {
        exerciseId: exerciseId,
        loggedSession,
      });
    });
  });
};

let startNewProgram = server => {
  let macrocycle = server.schema.macrocycles.find(1);
  let mesocycle = server.schema.mesocycles.find(macrocycle.mesocycleIds[0]);
  let _microcycle = server.schema.microcycles.find(mesocycle.microcycleIds[0]);
};

let startNewPerformanceTest = server => {
  let user = server.schema.users.find(1);

  let _exercise = server.create('exercise');

  let performanceTest = server.create('performance-test', {
    user,
  });

  let e1 = server.create('exercise', {
    name: 'Squat',
    code: 'sq_variant',
    sets: 1,
    repsLow: 1,
    repsHigh: 1,
    rpe: 9,
    performanceTest,
  });

  server.create('logged-exercise', {
    exercise: e1,
    performanceTest,
  });

  let e2 = server.create('exercise', {
    name: 'Run',
    code: 'run',
    sets: 1,
    distance: '1000',
    rpe: 9,
    performanceTest,
  });

  server.create('logged-exercise', {
    exercise: e2,
    performanceTest,
  });

  let e3 = server.create('exercise', {
    name: 'Pushups',
    code: 'pushups',
    sets: 1,
    amrap: true,
    rpe: 9,
    performanceTest,
  });

  server.create('logged-exercise', {
    exercise: e3,
    performanceTest,
  });

  return {
    performanceTest,
  };
};

export {
  logSomeSessions,
  setupBasicProgram,
  setupDefaultPrograms,
  startNewProgram,
  startNewPerformanceTest,
};
