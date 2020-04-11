const express = require('express');
const path = require('path');

const app = express();

const BUILD_OUTPUT_DIR = 'build';

app.use(express.static(path.join(__dirname, BUILD_OUTPUT_DIR)));

app.get('/config', function (req, res) {
  res.send({
    urls: {
      articleJob: process.env.APP_SERVER_BASE_URL
    }
  });
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, BUILD_OUTPUT_DIR, 'index.html'));
});

app.listen(80);
