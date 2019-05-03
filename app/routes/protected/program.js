import Route from '@ember/routing/route';
import {hash} from 'rsvp';

export default Route.extend({
  model({id}) {
    let loggedMacrocycle = this.store.findRecord('logged-macrocycle', id, {
      include:
        'macrocycle.mesocycles.microcycles.sessions.exercises,loggedMesocycles.loggedMicrocycles.loggedSessions.loggedExercises',
      reload: true,
    });

    return hash({
      loggedMacrocycle,
    });
  },
});
