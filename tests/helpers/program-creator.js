import {
  authenticateSession,
  currentSession,
} from 'ember-simple-auth/test-support';

let setupDefaultUser = async server => {
  let user = server.create('user', {
    name: 'ryan',
  });

  server.create('profile', {
    user,
  });

  await authenticateSession();
  await currentSession().set('data', {
    authenticated: {
      authenticator: 'authenticator:magic-link',
      token: 'hotdog',
    },
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
    timesToRepeat: 12,
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

let setupDefaultPrograms = async server => {
  await setupDefaultUser(server);
  setupDefaultCycles(server);
};

let setupBasicProgram = server => {
  let user = server.create('user');
  let macrocycle = server.create('macrocycle', {user});
  let mesocycle = server.create('mesocycle', {macrocycle});
  let microcycle = server.create('microcycle', {
    mesocycle,
    timesToRepeat: 12,
  });

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
  if (!server.db.loggedSessions.length) {
    throw 'asdfasdfasd';
  }

  let {loggedSessions} = server.db;

  loggedSessions.slice(0, 4).forEach(loggedSession => {
    server.db.loggedSessions.update(loggedSession.id, {endedAt: new Date()});
  });
};

let startNewProgram = async (server, user, macrocycle) => {
  user = user || server.schema.users.find(1);
  macrocycle = macrocycle || server.schema.macrocycles.find(1);

  let loggedMacrocycle = server.create('logged-macrocycle', {
    macrocycle,
  });

  macrocycle.mesocycles.models.forEach(function(mesocycle) {
    let loggedMesocycle = server.create('logged-mesocycle', {
      loggedMacrocycle,
      mesocycle,
    });
    mesocycle.microcycles.models.forEach(function(microcycle) {
      for (let i = 0; i < microcycle.timesToRepeat; i++) {
        let loggedMicrocycle = server.create('logged-microcycle', {
          microcycle,
          week: i + 1,
          loggedMesocycle,
        });

        microcycle.sessions.models.forEach(function(session) {
          let loggedSession = server.create('logged-session', {
            loggedMicrocycle,
            session,
          });

          session.exercises.models.forEach(function(exercise) {
            let loggedExercise = server.create('logged-exercise', {
              exercise,
              loggedSession,
            });

            // Create set objects
            for (let i = 0; i < exercise.sets; i++) {
              let _loggedSet = server.create('logged-set', {
                exercise,
                loggedExercise,
              });
            }
          });
        });
        // break;
      }
    });
  });

  let loggedSessions = loggedMacrocycle.loggedMesocycles.models.firstObject.loggedMicrocycles.models.map(
    lm => lm.loggedSessions.models.firstObject,
  );
  // debugger;
  // let firstLoggedSession =

  return {
    loggedMacrocycle,
    firstLoggedSession: loggedSessions[0],
    loggedSessions,
  };
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
