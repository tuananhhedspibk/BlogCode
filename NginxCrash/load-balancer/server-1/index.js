const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server 1\n');
});

app.listen(1111, () => {
  console.log('Listening on port 1111');
});
