'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = '/me/keyring-connections/';

var KeyringConnection = function () {

	/**
  * `KeyringConnection` constructor.
  *
  * @param {String} keyId - the connection ID to take action on.
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function KeyringConnection(keyId, wpcom) {
		(0, _classCallCheck3.default)(this, KeyringConnection);

		if (!(this instanceof KeyringConnection)) {
			return new KeyringConnection(keyId, wpcom);
		}
		this._id = keyId;
		this.wpcom = wpcom;
	}

	/**
  * Get a single Keyring connection that the current user has setup.
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(KeyringConnection, [{
		key: 'get',
		value: function get(query, fn) {
			return this.wpcom.req.get(root + this._id, query, fn);
		}

		/**
   * Delete the Keyring connection (and associated token) with the
   * provided ID. Also deletes all associated publicize connections.
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'delete',
		value: function _delete(query, fn) {
			return this.wpcom.req.del(root + this._id + '/delete', query, fn);
		}
	}]);
	return KeyringConnection;
}();

exports.default = KeyringConnection;
module.exports = exports['default'];

//# sourceMappingURL=me.keyring-connection.js.map