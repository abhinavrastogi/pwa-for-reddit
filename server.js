const express = require('express');
const fs = require('fs');
const compression = require('compression');

const port = process.env.PORT || 8000;

const app = express()

app.use(compression());

app.use(express.static('build'));
app.use(express.static('static'));

app.get('*', (req, res) => {
  res.type('html').send(fs.readFileSync('build/index.html'));
})

app.listen(port, _ => {
  console.log('Server listening on port', port)
});