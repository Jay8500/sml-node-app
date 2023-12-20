'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = '/me/connected-applications/';

var MeConnectedApp = function () {

	/**
  * `MeConnectedApp` constructor.
  *
  * @param {String} appId - application identifier
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function MeConnectedApp(appId, wpcom) {
		(0, _classCallCheck3.default)(this, MeConnectedApp);

		if (!(this instanceof MeConnectedApp)) {
			return new MeConnectedApp(appId, wpcom);
		}
		this._id = appId;
		this.wpcom = wpcom;
	}

	/**
  * Get one of current user's connected applications.
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(MeConnectedApp, [{
		key: 'get',
		value: function get(query, fn) {
			return this.wpcom.req.get(root + this._id, query, fn);
		}

		/**
   * Delete the app of the  current user
   * through of the given appId
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
	return MeConnectedApp;
}();

exports.default = MeConnectedApp;
module.exports = exports['default'];

//# sourceMappingURL=me.connected-application.js.map