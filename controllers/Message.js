'use strict';

const express = require('express');
const app = express();

const Message = require('../models/Message');

app.get('/(:message_id)?', (req, res, next) => {
  let id = req.params.message_id;
  if (id) {
    return Message.find(id, (err, message) => err ? next(err) : res.send(message.data));
  }

  Message.findAll((err, messages) => err ? next(err) : res.send(messages.map(message => message.data)));
});

app.post('/', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let message = new Message();
  message.setData(req.body);
  message.save((err, message) => err ? next(err) : res.send(message.data));
});

app.put('/:message_id', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let id = req.params.message_id;

  Message.find(id, (err, message) => {
    message.setData(req.body);
    message.save((err, message) => err ? next(err) : res.send(message.data));
  });
});

app.delete('/:message_id', (req, res, next) => {
  let id = req.params.message_id;

  Message.find(id, (err, message) => {
    if (message) {
      message.delete(err => err ? next(err) : res.send());
    }
  });
});

module.exports = app;