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
		console.log('Success saving: ', doc);
	});
}

let find = () => {
	Repo.find(function (err, doc) {
	  if (err) return console.error(err);
	  console.log('Find produced: ', doc);
	})
}

module.exports.save = save;
module.exports.find = find;
