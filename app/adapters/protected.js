import ApplicationAdapter from './application';
import {inject as service} from '@ember/service';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import {isPresent} from '@ember/utils';

export default ApplicationAdapter.extend(DataAdapterMixin, {
  session: service(),
  authorize(xhr) {
    let {token} = this.get('session.data.authenticated');
    if (isPresent(token)) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
  },
});
