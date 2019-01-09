import moment from 'moment';

let setupDefaultPrograms = server => {
  let user = server.create('user', {
    name: 'ryan',
  });

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

  let exerciseForSessionMonday = server.create('exercise', {
    session: sessionMonday,
    code: 'lp_variant',
    sets: 3,
    repsLow: 5,
    repsHigh: 8,
    percentRM: 80,
    rpe: 8,
  });

  let macrocycle2 = server.create('macrocycle', {
    user,
    name: "Robyn's Program",
    slug: 'robyns-program',
  });

  let mesocycle2 = server.create('mesocycle', {
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

  return {
    sessionMonday,
    exerciseForSessionMonday,
  };
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

export {setupDefaultPrograms, setupBasicProgram, logSomeSessions};
