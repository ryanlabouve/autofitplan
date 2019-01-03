import Route from '@ember/routing/route';
import {hash} from 'rsvp';

export default Route.extend({
  model() {
    let macrocycles = this.store.findAll('macrocycle');
    return hash({
      macrocycles,
    });
  },
});
