'use strict';

var Mongodb = require('my-mongodb');

class Room {
  constructor() {
    this.isNew = true;
    this.data = {};
  }

  static findAll() {
    return Mongodb.findAll('rooms')
    .then(docs => {
      let rooms = docs.map(doc => {
        let room = new Room();
        room.isNew = false;
        return room.setData(doc);
      });
      return rooms;
    })
    .catch(err => {
      return Promise.reject(err);
    });
  }

  static find(id) {
    return Mongodb.find('rooms', id)
    .then(doc => {
      let room = new Room();
      room.isNew = false;
      room.setData(doc);
      return room;
    })
    .catch(err => {
      return Promise.reject(err);
    });
  }

  setData(data) {
    Object.keys(data).map(k => this.data[k] = data[k]);
    return this;
  }

  save() {
    var result;
    if (this.isNew) {
      result = Mongodb.insert('rooms', this.data);
    } else {
      result = Mongodb.update('rooms', this.data._id, this.data);
    }

    result = result.then((id) => {
      return Room.find(id)
      .catch(err => {return Promise.reject(err)})
      .then(room => {
        this.data = room.data;
        this.isNew = room.isNew;
        return this;
      })
      .catch(err => {return Promise.reject(err)});
    });
    return result;
  }

  delete() {
    if (this.isNew) {
      let err = new Error('Can\'t be delete'); 
      return Promise.reject(err);
    } else {
      return Mongodb.delete('rooms', this.data._id)
      .then(data => {return data})
      .catch(err => {return err});
    }
  }
}

module.exports = Room;
