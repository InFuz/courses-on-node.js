'use strict';

var Mongodb = require('my-mongodb');

class Message {
  constructor() {
    this.isNew = true;
    this.data = {};
  }

  static findAll(cb) {
    Mongodb.findAll('messages', (err, docs) => {
      if (err) { return cb(err); }

      let messages = docs.map(doc => {
        let message = new Message();
        message.isNew = false;
        return message.setData(doc);
      });

      cb(err, messages);
    });
  }

  static find(id, cb) {
    Mongodb.find('messages', id, (err, doc) => {
      if (err) { return cb(err); }

      let message = new Message();
      message.isNew = false;
      message.setData(doc);

      cb(err, message);
    });
  }

  setData(data) {
    Object.keys(data).map(k => this.data[k] = data[k]);
    return this;
  }

  save(cb) {
    let isSave = (err, id) => {
      if (err) { return cb(err); }
      Message.find(id, (err, message) => {
        this.data = message.data;
        this.isNew = message.isNew;
        cb(err, this);
      });
    };

    if (this.isNew) {
      Mongodb.insert('messages', this.data, isSave);
    } else {
      Mongodb.update('messages', this.data._id, this.data, isSave);
    }
  }

  delete(cb) {
    if (this.isNew) {
      cb(new Error('Can\'t be delete'));
    } else {
      Mongodb.delete('messages', this.data._id, cb);
    }
  }
}

module.exports = Message;
