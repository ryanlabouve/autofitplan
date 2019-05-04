import Route from '@ember/routing/route';
import {hash} from 'rsvp';
import ResetScroll from 'autofitplan/mixins/reset-scroll';

export default Route.extend(ResetScroll, {
  model() {
    return hash({
      macrocycles: this.store.findAll('macrocycle', {
        include: 'mesocycles.microcycles.sessions.exercises',
      }),
    });
  },
});
