import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  links(loggedExercise) {
    return {
      'logged-exercise-history': {
        related: `/api/logged-exercises/${loggedExercise}/historic?include=logged-session`,
      },
    };
  },
});
