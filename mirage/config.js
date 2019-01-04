export default function() {
  this.namespace = '/api';
  this.logging = true;
  this.get('/macrocycles', ({macrocycles}, request) => {
    const {queryParams} = request;

    if (!Object.keys(queryParams).length) {
      return macrocycles.all();
    }

    let slug = queryParams['filter[slug]'];
    return macrocycles.where({slug});
  });
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
  this.patch('/logged-sessions');
  this.get('/logged-exercises');
  this.get('/logged-exercises/:id');
  this.post('/logged-exercises');
  this.patch('/logged-exercises');
}
