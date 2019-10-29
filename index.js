require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const router = require('./controller/router');
const bodyParser = require('body-parser');
const cors = require('cors');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(express.static('public'));
app.use(cors());
app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
