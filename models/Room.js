'use strict';

var Mongodb = require('my-mongodb');

class Room {
  constructor() {
    this.isNew = true;
    this.data = {};
  }

  static findAll(cb) {
    Mongodb.findAll('rooms', (err, docs) => {
      if (err) { return cb(err); }

      let rooms = docs.map(doc => {
        let room = new Room();
        room.isNew = false;
        return room.setData(doc);
      });

      cb(err, rooms);
    });
  }

  static find(id, cb) {
    Mongodb.find('rooms', id, (err, doc) => {
      if (err) { return cb(err); }

      let room = new Room();
      room.isNew = false;
      room.setData(doc);

      cb(err, room);
    });
  }

  setData(data) {
    Object.keys(data).map(k => this.data[k] = data[k]);
    return this;
  }

  save(cb) {
    let isSave = (err, id) => {
      if (err) { return cb(err); }
      Room.find(id, (err, room) => {
        this.data = room.data;
        this.isNew = room.isNew;
        cb(err, this);
      });
    };

    if (this.isNew) {
      Mongodb.insert('rooms', this.data, isSave);
    } else {
      Mongodb.update('rooms', this.data._id, this.data, isSave);
    }
  }

  delete(cb) {
    if (this.isNew) {
      cb(new Error('Can\'t be delete'));
    } else {
      Mongodb.delete('rooms', this.data._id, cb);
    }
  }
}

module.exports = Room;
