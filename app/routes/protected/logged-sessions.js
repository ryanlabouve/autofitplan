import Route from '@ember/routing/route';
import {hash} from 'rsvp';
import ResetScroll from 'autofitplan/mixins/reset-scroll';

export default Route.extend(ResetScroll, {
  model({id}) {
    let loggedSession = this.store.findRecord('logged-session', id, {
      include:
        'session.microcycle.mesocycle.macrocycle,logged-exercises.exercise',
      reload: true,
    });

    return hash({
      loggedSession,
    });
  },
});
