import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('protected', {path: '/'}, function() {
    this.route('performance-tests', {path: '/performance-tests/:id'});
    this.route('program', {path: '/program/:id'});
    this.route('new-program');
    this.route('goals-and-progress');
    this.route('macros-and-weight');
    this.route('logged-sessions', {path: '/logged-sessions/:id'});
    this.route('support-and-feedback', {path: '/support-and-feedback'});
  });
  this.route('login');
  this.route('token', {path: '/token/:token'});
});

export default Router;
