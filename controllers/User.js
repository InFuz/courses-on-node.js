'use strict';

const express = require('express');
const app = express();

const User = require('../models/User');

app.get('/(:user_id)?', (req, res, next) => {
  let id = req.params.user_id;
  if (id) {
    return User.find(id, (err, user) => err ? next(err) : res.send(user.data));
  }

  User.findAll((err, users) => err ? next(err) : res.send(users.map(user => user.data)));
});

app.post('/', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let user = new User();
  user.setData(req.body);
  user.save((err, user) => err ? next(err) : res.send(user.data));
});

app.put('/:user_id', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let id = req.params.user_id;

  User.find(id, (err, user) => {
    user.setData(req.body);
    user.save((err, user) => err ? next(err) : res.send(user.data));
  });
});

app.delete('/:user_id', (req, res, next) => {
  let id = req.params.user_id;

  User.find(id, (err, user) => {
    if (user) {
      user.delete(err => err ? next(err) : res.send('')); 
    }
  });
});

module.exports = app;