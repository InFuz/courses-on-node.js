'use strict';

const express = require('express');
const app = express();

const Room = require('../models/Room');

app.get('/(:room_id)?', (req, res, next) => {
  let id = req.params.room_id;
  if (id) {
    return Room.find(id, (err, room) => err ? next(err) : res.send(room.data));
  }

  Room.findAll((err, rooms) => err ? next(err) : res.send(rooms.map(room => room.data)));
});

app.post('/', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let room = new Room();
  room.setData(req.body);
  room.save((err, room) => err ? next(err) : res.send(room.data));
});

app.put('/:room_id', (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send('Empty data');
  }

  let id = req.params.room_id;

  Room.find(id, (err, room) => {
    room.setData(req.body);
    room.save((err, room) => err ? next(err) : res.send(room.data));
  });
});

app.delete('/:room_id', (req, res, next) => {
  let id = req.params.room_id;
  
  Room.find(id, (err, room) => {
    if (room) {
      room.delete(err => err ? next(err) : res.send());
    }
  });
});

module.exports = app;