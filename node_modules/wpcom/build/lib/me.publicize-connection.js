'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = '/me/publicize-connections/';

var PublicizeConnection = function () {
	/**
 * `PublicizeConnection` constructor.
 *
 * @param {String} connectionId - application identifier
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
	function PublicizeConnection(connectionId, wpcom) {
		(0, _classCallCheck3.default)(this, PublicizeConnection);

		if (!(this instanceof PublicizeConnection)) {
			return new PublicizeConnection(connectionId, wpcom);
		}
		this._id = connectionId;
		this.wpcom = wpcom;
	}

	/**
  * Get a single publicize connection that the current user has set up.
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(PublicizeConnection, [{
		key: 'get',
		value: function get(query, fn) {
			return this.wpcom.req.get(root + this._id, query, fn);
		}

		/**
   * Add a publicize connection belonging to the current user.
   *
   * @param {Object} [query] - query object parameter
   * @param {Object} body - body object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'add',
		value: function add(query, body, fn) {
			return this.wpcom.req.post(root + 'new', query, body, fn);
		}

		/**
   * Update a publicize connection belonging to the current user.
   *
   * @param {Object} [query] - query object parameter
   * @param {Object} body - body object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'update',
		value: function update(query, body, fn) {
			return this.wpcom.req.put(root + this._id, query, body, fn);
		}

		/**
  * Delete the app of the  current user
  * through of the given connectionId
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
	return PublicizeConnection;
}();

exports.default = PublicizeConnection;
module.exports = exports['default'];

//# sourceMappingURL=me.publicize-connection.js.map