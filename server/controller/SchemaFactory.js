"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SchemaFactory = (function () {
  function SchemaFactory(mongoose) {
    _classCallCheck(this, SchemaFactory);

    this.mongoose = mongoose;
    this.Schema = mongoose.Schema;
  }

  _createClass(SchemaFactory, [{
    key: "getUserSchema",
    value: function getUserSchema() {
      return new this.Schema({
        username: String,
        password: String,
        avatar: String
      });
    }
  }]);

  return SchemaFactory;
})();

exports["default"] = SchemaFactory;
module.exports = exports["default"];