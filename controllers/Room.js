'use strict';

const express = require('express');
const app = express();

const Room = require('../models/Room');

app.get('/(:room_id)?', (req, res, next) => {
  let id = req.params.room_id;
  if (id) {
    return  Room.find(id)
            .then(room => res.send(room.data))
            .catch(err => (res.send('Room not found'), next(err)));
  }

  Room.findAll()
  .then(rooms => res.send(rooms.map(room => room.data)))
  .catch(err => next(err));
});

app.post('/', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let room = new Room();
  room.setData(req.body);
  room.save()
  .then(room => res.send(room.data))
  .catch(err => next(err));
});

app.put('/:room_id', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let id = req.params.room_id;

  return Room.find(id)
      .catch(err => {return Promise.reject(err)})
      .then(room => {
        room.setData(req.body);
        room.save()
        .then(room => res.send(room.data))
        .catch(err => next(err));
      });
});

app.delete('/:room_id', (req, res, next) => {
  let id = req.params.room_id;

  Room.find(id)
  .then(room => {return room.delete()})
  .catch(err => (res.send('Room not found'), next(err)))
  .then(data => res.send('Room ' + id + ' delete'))
  .catch(err => (res.send('Error!'), next(err))); 
});

module.exports = app;