import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {hash} from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    let macrocycles = this.store.findAll('macrocycle');
    return hash({
      macrocycles,
    });
  },
});
