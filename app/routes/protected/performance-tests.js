import Route from '@ember/routing/route';
import {hash} from 'rsvp';

export default Route.extend({
  model({id}) {
    let performanceTest = this.store.findRecord('performanceTest', id, {
      include: 'user,exercises,loggedExercises',
      reload: true,
    });
    return hash({
      performanceTest,
    });
  },
});
