import Route from '@ember/routing/route';
import programs from 'auto-hypertrophy/utils/programs';

export default Route.extend({
  model() {
    let macrocycles = this.store.findAll('macrocycle');
    return {
      programs,
      macrocycles,
    };
  },
});
