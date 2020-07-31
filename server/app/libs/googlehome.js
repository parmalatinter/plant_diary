var request = require('request');
var options = {
  uri: "http://localhost:8091/google-home-notifier",
  method: 'POST',
  form: {"text":""}
};

async function command(text) {
	console.log(text)
	options["form"]["text"] = text;
	await request.post(options);
}

exports.say = (text) => command(text);
