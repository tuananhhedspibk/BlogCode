const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server 3\n');
});

app.listen(3333, () => {
  console.log('Listening on port 3333');
});
