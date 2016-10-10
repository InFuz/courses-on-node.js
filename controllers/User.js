'use strict';

const express = require('express');
const app = express();

const User = require('../models/User');

app.get('/(:user_id)?', (req, res, next) => {
  let id = req.params.user_id;
  if (id) {
    return  User.find(id)
            .then(user => res.send(user.data))
            .catch(err => (res.send('User not found'), next(err)));
  }

  User.findAll()
  .then(users => res.send(users.map(user => user.data)))
  .catch(err => next(err));
});

app.post('/', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let user = new User();
  user.setData(req.body);
  user.save()
  .then(user => res.send(user.data))
  .catch(err => next(err));
});

app.put('/:user_id', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let id = req.params.user_id;

  return User.find(id)
      .catch(err => {return Promise.reject(err)})
      .then(user => {
        user.setData(req.body);
        user.save()
        .then(user => res.send(user.data))
        .catch(err => next(err));
      });
});

app.delete('/:user_id', (req, res, next) => {
  let id = req.params.user_id;

  User.find(id)
  .then(user => {return user.delete()})
  .catch(err => (res.send('User not found'), next(err)))
  .then(data => res.send('User ' + id + ' delete'))
  .catch(err => (res.send('Error!'), next(err))); 
});

module.exports = app;