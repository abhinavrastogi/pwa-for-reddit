const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.type('html').sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000);
