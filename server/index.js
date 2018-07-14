const express = require('express');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/repos', function (req, res) {
	// TODO - your code here!
	// This route should take the github username provided
	// and get the repo information from the github API, then
	// save the repo information in the database
	console.log(req.method);
	console.log(req.body.username);
	db.find(req.body.username, github.getReposByUsername, res);
	// db.find(undefined, github.getReposByUsername, res);

});

app.get('/repos', function (req, res) {
	// TODO - your code here!
	// This route should send back the top 25 repos
	console.log('req.method: ', req.method);
	console.log(req.body);
	db.find(undefined, github.getReposByUsername, res);
	// db.find('test')
});

let port = 1128;

app.listen(port, function() {
	console.log(`listening on port ${port}`);
});

