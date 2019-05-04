import Route from '@ember/routing/route';
import {hash} from 'rsvp';
import ResetScroll from 'autofitplan/mixins/reset-scroll';

export default Route.extend(ResetScroll, {
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
