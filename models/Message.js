'use strict';

var Mongodb = require('my-mongodb');

class Message {
  constructor() {
    this.isNew = true;
    this.data = {};
  }

  static findAll() {
    return Mongodb.findAll('messages')
    .then(docs => {
      let messages = docs.map(doc => {
        let message = new Message();
        message.isNew = false;
        return message.setData(doc);
      });
      return messages;
    })
    .catch(err => {
      return Promise.reject(err);
    });
  }

  static find(id) {
    return Mongodb.find('messages', id)
    .then(doc => {
      let message = new Message();
      message.isNew = false;
      message.setData(doc);
      return message;
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
      result = Mongodb.insert('messages', this.data);
    } else {
      result = Mongodb.update('messages', this.data._id, this.data);
    }

    result = result.then((id) => {
      return Message.find(id)
      .catch(err => {return Promise.reject(err)})
      .then(message => {
        this.data = message.data;
        this.isNew = message.isNew;
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
      return Mongodb.delete('messages', this.data._id)
      .then(data => {return data})
      .catch(err => {return err});
    }
  }
}

module.exports = Message;
