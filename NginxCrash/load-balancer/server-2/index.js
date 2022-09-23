const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server 2\n');
});

app.listen(2222, () => {
  console.log('Listening on port 2222');
});
