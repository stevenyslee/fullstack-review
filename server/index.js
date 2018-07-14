const express = require('express');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.method);
  github.getReposByUsername('stevenyslee', db.save, db.find);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('req.method: ', req.method);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

