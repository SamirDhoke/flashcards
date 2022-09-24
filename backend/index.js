const mongoose = require('mongoose');
const express = require('express');
const router = require('./routes');
const cors = require('cors');

require('dotenv').config();

const MONGO_PASSWORD = process.env.MONGO_PASS;
const MONGO_DB = process.env.MONGO_DB;
const PORT = process.env.PORT;
const MONGO_URL = `mongodb+srv://private_application:${MONGO_PASSWORD}@cluster0.i6eur.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

const OPTIONS = {};

const app = express();

mongoose
	.connect(MONGO_URL, OPTIONS)
	.then(() => {
		console.log('CONNECTED!');
	})
	.catch(e => console.log('[ERROR]', e.message));

app.use(cors());
app.use(express.json());
app.use(express.static('dist'))
app.use((req, res, next) => {
	console.log('---');
	console.log('URL', req.url);
	console.log('METHOD', req.method);
	console.log('BODY', req.body);
	next();
})

app.use('/', router);

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
})

app.listen(PORT, () => console.log('listening...'))