import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('protected', {path: '/'}, function() {
    this.route('program', {path: '/program/:slug'});
    this.route('new-program');
  });
  this.route('login');
  this.route('token', {path: '/token/:token'});
});

export default Router;
