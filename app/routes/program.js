import Route from '@ember/routing/route';
import {hash} from 'rsvp';

export default Route.extend({
  model({slug}) {
    let macrocycles = this.store.findAll('macrocycle');
    let macrocycle = this.store
      .query('macrocycle', {
        filter: {
          slug,
        },
        include:
          'mesocycles.microcycles.sessions.exercises,mesocycles.microcycles.sessions.loggedSessions.loggedExercises',
      })
      .then(macrocycles => macrocycles.get('firstObject'));

    return hash({
      macrocycles,
      macrocycle,
    });
  },
});
