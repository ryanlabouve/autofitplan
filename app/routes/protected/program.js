import Route from '@ember/routing/route';
import {hash} from 'rsvp';
import ResetScroll from 'autofitplan/mixins/reset-scroll';

export default Route.extend(ResetScroll, {
  model({id}) {
    let loggedMacrocycle = this.store.findRecord('logged-macrocycle', id, {
      include:
        'macrocycle.mesocycles.microcycles.sessions.exercises,logged-mesocycles.logged-microcycles.logged-sessions.logged-exercises',
      reload: true,
    });

    return hash({
      loggedMacrocycle,
    });
  },
});
