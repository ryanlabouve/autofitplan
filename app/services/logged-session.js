import Service from '@ember/service';
import {get} from '@ember/object';
import {inject as service} from '@ember/service';

export default Service.extend({
  store: service(),

  async createLoggedSession({session}) {
    let store = get(this, 'store');
    let loggedSession = store.createRecord('loggedSession', {
      session,
      week,
    });

    try {
      await loggedSession.save();
    } catch (e) {
      throw e;
    }

    let exercises = session
      .get('exercises')
      .toArray()
      .map(exercise => {
        let record = store.createRecord('loggedExercise', {
          exercise,
          loggedSession,
        });
        return record.save();
      });
    await Promise.all(exercises);
    // exercises.forEach(exercise => {
    //   store.createRecord('loggedExercise', {
    //     loggedSession,
    //   });
    // });

    return loggedSession;
  },

  // lookupLoggedSession(microcycle, weekIndex, session) {
  //   let allSessions = get(session, 'loggedSessions');
  //
  //   //
  // },
});
