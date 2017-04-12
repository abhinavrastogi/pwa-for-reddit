const express = require('express');
const path = require('path');
const spdy = require('spdy');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.static('static'));

app.get('*', (req, res) => {
  res.type('html').sendFile(path.join(__dirname, 'index.html'));
});

// const credentials = {
//     key: fs.readFileSync(path.join(__dirname, 'certificates', 'my.flipkart.com.key')),
//     cert:  fs.readFileSync(path.join(__dirname, 'certificates', 'my.flipkart.com.crt'))
// };

app.listen(process.env.PORT || port);

// spdy
//   .createServer(credentials, app)
//   .listen(port, (error) => {
//     console.log('H2 server listening on port: ' + port);
// });
