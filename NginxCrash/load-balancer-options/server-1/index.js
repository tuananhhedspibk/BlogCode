const express = require('express');

const app = express();

app.get('/', async (req, res) => {
  await new Promise(r => setTimeout(r, 20000)); // 20000ms = 20s

  res.send('Slow Server 1\n');
});

app.listen(1111, () => {
  console.log('Listening on port 1111');
});
