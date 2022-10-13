const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log("req.headers", req.headers);
  console.log("req.url", req.url);
  console.log("req.route", req.route);
  res.send('I am an endpoint');
});

app.listen(7777, () => {
  console.log('Listening on port 7777');
});
