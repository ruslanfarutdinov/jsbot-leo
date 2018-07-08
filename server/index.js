const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const getAnswer = require('./../dialogflow/dialogflow.js');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../client/public')));

app.get('/dialogflow/:query', (req, res) => {
	console.log(req.params);
	const { params } = req;

	getAnswer(params.query, (err, response) => {
		if (err) {
			console.log(`Error connecting to dialogflow: ${err}`);
		} else {
			res.status(200);
			res.send(response);
		}

	})
});

app.listen(3000, () => {
	console.log('listening on port 3000');
})
