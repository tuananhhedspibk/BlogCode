const request =  require('request');

request({
  url: 'http://www.google.com/',
  method: 'GET',
  proxy: 'http://127.0.0.1:8888',
}, (err, response, body) => {
  if (!err && response.statusCode === 200) {
    console.log(body);
  }
});
