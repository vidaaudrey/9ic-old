"use strict";

import faker from 'faker';

class DataFaker {

  constructor(User) {
    this.User = User;
  }

  createUsers(count) {
    this._removeData(this.User, () => {
      let number = count || 5;

      for (var i = 0; i < number; i++) {
        this._createUser(this.User);
      }
    });
  }

  _createUser() {
    let user = new this.User({
      username: faker.name.findName(),
      password: faker.internet.password(),
      avatar: faker.image.avatar()
    });

    user.save((err, savedUser) => {
      console.log('new user saved', savedUser);
    });
    return user;
  }

  _removeData(Schema, callback) {
    Schema.remove({}, (err) => {
      if (err) {
        console.log('Error deleting data from users');
      } else {
        console.log('Delete all data from users');
        return callback();
      }
    });
  }

}
export default DataFaker;
