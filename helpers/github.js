const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, save) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      for (let i = 0; i < info.length; i++) {
        save(info[i].owner.login, info[i].full_name, info[i].stargazers_count);
      }
    }
  }

  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;