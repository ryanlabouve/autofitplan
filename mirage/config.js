import Mirage from 'ember-cli-mirage';

export default function() {
  this.namespace = '/api';
  this.logging = true;

  this.post('/login', (_, req) => {
    return req.requestBody;
  });

  this.get('/users/:id');
  this.patch('/users/:id');

  this.get('/users/me', ({users}, req) => {
    let res = new Mirage.Response(404, {}, {});

    if (req.requestHeaders['Authorization'] === 'Bearer hotdog') {
      res = users.find(1) || res;
    }
    return res;
  });

  this.post('/token', (_, req) => {
    let body = JSON.parse(req.requestBody);
    if (body.data.token === 'hotdog') {
      return new Mirage.Response(201, {}, body);
    } else {
      return new Mirage.Response(401, {}, {message: 'unauthed'});
    }
  });

  this.get('/macrocycles', ({macrocycles}, request) => {
    const {queryParams} = request;

    let slug = queryParams['filter[slug]'];
    if (slug) {
      return macrocycles.where({slug});
    } else {
      return macrocycles.all();
    }
  });
  this.get('/macrocycles/:id');

  this.get('/mesocycles');
  this.get('/mesocycles/:id');
  this.get('/microcycles');
  this.get('/microcycles/:id');
  this.get('/sessions');
  this.get('/sessions/:id');
  this.get('/exercises');
  this.get('/exercises/:id');

  this.get('/logged-sessions');
  this.get('/logged-sessions/:id');
  this.post('/logged-sessions');
  this.patch('/logged-sessions/:id');

  this.get('/logged-exercises', ({loggedExercises}, request) => {
    // To support filtering by IDS for loggedExerciseHistory
    let ids = request.queryParams['filter[loggedExerciseIds]'];
    let returnedLoggedExercises = null;
    if (ids) {
      returnedLoggedExercises = loggedExercises.find(ids.split(','));
    } else {
      returnedLoggedExercises = loggedExercises.all();
    }

    return returnedLoggedExercises;
  });
  this.get('/logged-exercises/:id');
  this.post('/logged-exercises');
  this.patch('/logged-exercises/:id');

  this.get('/logged-macrocycles');
  this.post('/logged-macrocycles');
  this.get('/logged-macrocycles/:id');

  this.get('/performance-tests');
  this.get('/performance-tests/:id');
  this.post('/performance-tests');
  this.patch('/performance-tests/:id');

  this.get('/home-screen-items');

  this.post('/daily-measurements');
  this.patch('/daily-measurements/:id');

  this.get('/logged-sets', ({loggedSets}, request) => {
    let returnedLoggedSets;

    if (request.queryParams) {
      let loggedExerciseId = request.queryParams['filter[logged_exercise_id]'];
      return loggedSets.where({loggedExerciseId});
    } else {
      returnedLoggedSets = loggedSets.all();
    }

    return returnedLoggedSets;
  });
  this.get('/logged-sets/:id');
  this.patch('/logged-sets/:id');
}
