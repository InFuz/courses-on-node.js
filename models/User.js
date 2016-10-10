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
			return users;
		})
		.catch(err => {
			return Promise.reject(err);
		});
	}

	static find(id) {
		return Mongodb.find('users', id)
		.then(doc => {
			let user = new User();
			user.isNew = false;
			user.setData(doc);
			return user;
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
			result = Mongodb.insert('users', this.data);
		} else {
			result = Mongodb.update('users', this.data._id, this.data);
		}

		result = result.then((id) => {
			return User.find(id)
			.catch(err => {return Promise.reject(err)})
			.then(user => {
				this.data = user.data;
				this.isNew = user.isNew;
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
			return Mongodb.delete('users', this.data._id)
			.then(data => {return data})
			.catch(err => {return err});
		}
	}
}

module.exports = User;
