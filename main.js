// GET REQUEST
function getTodos() {
  // axios({
  //  method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.log(err));

  // eslint-disable-next-line no-undef
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => showOutput(res))
      .catch(err => console.log(err));
}

// POST REQUEST
function addTodo() {
  // eslint-disable-next-line no-undef
  //  axios({
  //  method: 'post',
  //  url: 'https://jsonplaceholder.typicode.com/todos',
  //  data: {
  //    title: 'New Todo',
  //     completed: false
  //   }
  // })
  //   .then(res => showOutput(res))
  // .catch(err => console.log(err));

  // eslint-disable-next-line no-undef
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New ToDo',
    completed: false
  })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // eslint-disable-next-line no-undef
  axios.put('https://jsonplaceholder.typicode.com/todos/1', {
    title: 'Updated Todo',
    completed: true
  })
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  // eslint-disable-next-line no-undef
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  // eslint-disable-next-line no-undef
  axios.all([
    // eslint-disable-next-line no-undef
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    // eslint-disable-next-line no-undef
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
    // eslint-disable-next-line no-undef
    .then(axios.spread((todos, posts) => showOutput(posts) ))
    .catch(err => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer Token'
    }
  }
  // eslint-disable-next-line no-undef
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New ToDo',
    completed: false
  }, config)
    .then(res => showOutput(res))
    .catch(err => console.log(err));

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello Vanka'
    },
    // eslint-disable-next-line no-undef
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  }
  // eslint-disable-next-line no-undef
  axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  // eslint-disable-next-line no-undef
  axios.get('https://jsonplaceholder.typicode.com/todoss')
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response){
        // Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // Request was made but no response
        console.log(err.request)
      } else {
        console.log(err.message)
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
// eslint-disable-next-line no-undef
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);

  return config
}, error => {
  return Promise.reject(error)
})

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
