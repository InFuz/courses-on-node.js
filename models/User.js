'use strict';

var Mongodb = require('my-mongodb');

class User {
	constructor() {
		this.isNew = true;
		this.data = {};
	}

	static findAll() {
		return Mongodb.findAll('users')
		.then(docs => {
			let users = docs.map(doc => {
				let user = new User();
				user.isNew = false;
				return user.setData(doc);
			});

			return Promise.resolve(users);
		})
		.catch(err => {
			return Promise.reject(err);
		});
	}

	static find(id, cb) {
		Mongodb.find('users', id, (err, doc) => {
			if (err) { return cb(err); }

			let user = new User();
			user.isNew = false;
			user.setData(doc);

			cb(err, user);
		});
	}

	setData(data) {
		Object.keys(data).map(k => this.data[k] = data[k]);
		return this;
	}

	save(cb) {
		let isSave = (err, id) => {
			if (err) { return cb(err); }
			User.find(id, (err, user) => {
				this.data = user.data;
				this.isNew = user.isNew;
				cb(err, this);
			});
		};

		if (this.isNew) {
			Mongodb.insert('users', this.data, isSave);
		} else {
			Mongodb.update('users', this.data._id, this.data, isSave);
		}
	}

	delete(cb) {
		if (this.isNew) {
			cb(new Error('Can\'t be delete'));
		} else {
			Mongodb.delete('users', this.data._id, cb);
		}
	}
}

module.exports = User;
