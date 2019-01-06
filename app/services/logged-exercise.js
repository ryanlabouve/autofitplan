import Service from '@ember/service';
import {inject as service} from '@ember/service';

export default Service.extend({
  store: service(),
  async updateLoggedExercise(loggedExercise, {weight}) {
    loggedExercise.set('weight', weight);
    await loggedExercise.save();
  },
});
