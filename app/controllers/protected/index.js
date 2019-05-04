import Controller from '@ember/controller';
import {task} from 'ember-concurrency';
import {inject as service} from '@ember/service';
import {get} from '@ember/object';

export default Controller.extend({
  currentUser: service(),

  createNewPerformanceTest: task(function*() {
    try {
      let performanceTest = yield this.store.createRecord('performance-test');
      yield performanceTest.save();
      yield get(this, 'currentUser').reloadUser();

      this.transitionToRoute('protected.performance-tests', performanceTest.id);
    } catch (e) {
      console.error(e);
    }
  }),
});
