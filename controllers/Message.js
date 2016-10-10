'use strict';

const express = require('express');
const app = express();

const Message = require('../models/Message');

app.get('/(:message_id)?', (req, res, next) => {
  let id = req.params.message_id;
  if (id) {
    return  Message.find(id)
            .then(message => res.send(message.data))
            .catch(err => (res.send('Message not found'), next(err)));
  }

  Message.findAll()
  .then(messages => res.send(messages.map(message => message.data)))
  .catch(err => next(err));
});

app.post('/', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let message = new Message();
  message.setData(req.body);
  message.save()
  .then(message => res.send(message.data))
  .catch(err => next(err));
});

app.put('/:message_id', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let id = req.params.message_id;

  return Message.find(id)
      .catch(err => {return Promise.reject(err)})
      .then(message => {
        message.setData(req.body);
        message.save()
        .then(message => res.send(message.data))
        .catch(err => next(err));
      });
});

app.delete('/:message_id', (req, res, next) => {
  let id = req.params.message_id;

  Message.find(id)
  .then(message => {return message.delete()})
  .catch(err => (res.send('Message not found'), next(err)))
  .then(data => res.send('Message ' + id + ' delete'))
  .catch(err => (res.send('Error!'), next(err))); 
});

module.exports = app;