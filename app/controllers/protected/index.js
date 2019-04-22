import Controller from '@ember/controller';
import {task} from 'ember-concurrency';

export default Controller.extend({
  createNewPerformanceTest: task(function*() {
    try {
      let performanceTest = yield this.store.createRecord('performance-test');
      yield performanceTest.save();

      this.transitionToRoute('protected.performance-tests', performanceTest.id);
    } catch (e) {
      console.error(e);
    }
  }),
});
