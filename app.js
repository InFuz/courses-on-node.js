'use strict';

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const Mongodb = require('my-mongodb');

const app = express();

app.set('port', 8080);

app.use(cors());
app.use(express.static('./frontend/dist'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/', require('./controllers/getHtml'));
app.use('/api/user', require('./controllers/User'));
app.use('/api/room', require('./controllers/Room'));
app.use('/api/message', require('./controllers/Message'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send(err);
});

let startServer = () => {
	app.listen(app.get('port'), () => {
	  console.log('Server listening on port', app.get('port'));
	});
};

Mongodb.connect()
.then(() => {startServer();})
.catch(err => console.error(err));
