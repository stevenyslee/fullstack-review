const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
	user: String,
	repo: String,
	stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (user, repo, stars) => {
	let doc = new Repo({
		'user': user,
		'repo': repo,
		'stars': stars
	});
	doc.save(function(err, doc) {
		if (err) return console.error(err);
	});
}

let find = (username, callback, res) => {
	if (username) {
		Repo.find({user: username}, function (err, doc) {
		  if (err) {
		  	return console.error(err);
		  } else {
				if (doc.length > 0) {
					// console.log(doc.length);
					// Repo.collection.remove({});
					res.send('User already exists');
				} else {
					console.log('find username: ', username);
		  			callback(username, save);
		  			res.send();
				}
		  }
		}).limit(25).sort({ stars: 'desc'});
	} else {
		Repo.find({}, function (err, doc) {
		  if (err) {
		  	return console.error(err);
		  } else {
				if (doc.length > 0) {
					console.log('find all');
					res.send(doc);
				}
		  }
		}).limit(25).sort({ stars: 'desc'});
	}
}



module.exports.save = save;
module.exports.find = find;
