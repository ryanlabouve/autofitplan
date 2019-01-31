import Route from '@ember/routing/route';
import {hash} from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      macrocycles: this.store.findAll('macrocycle', {
        include: 'mesocycles.microcycles.sessions.exercises',
      }),
    });
  },
});
