"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var DataFaker = (function () {
  function DataFaker(User) {
    _classCallCheck(this, DataFaker);

    this.User = User;
  }

  _createClass(DataFaker, [{
    key: 'createUsers',
    value: function createUsers(count) {
      var _this = this;

      this._removeData(this.User, function () {
        var number = count || 5;

        for (var i = 0; i < number; i++) {
          _this._createUser(_this.User);
        }
      });
    }
  }, {
    key: '_createUser',
    value: function _createUser() {
      var user = new this.User({
        username: _faker2['default'].name.findName(),
        password: _faker2['default'].internet.password(),
        avatar: _faker2['default'].image.avatar()
      });

      user.save(function (err, savedUser) {
        console.log('new user saved', savedUser);
      });
      return user;
    }
  }, {
    key: '_removeData',
    value: function _removeData(Schema, callback) {
      Schema.remove({}, function (err) {
        if (err) {
          console.log('Error deleting data from users');
        } else {
          console.log('Delete all data from users');
          return callback();
        }
      });
    }
  }]);

  return DataFaker;
})();

exports['default'] = DataFaker;
module.exports = exports['default'];
