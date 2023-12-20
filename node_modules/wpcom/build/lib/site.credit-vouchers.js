'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SiteCreditVouchers methods
 *
 * @param {String} sid - site id
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
var SiteCreditVouchers = function () {
	function SiteCreditVouchers(sid, wpcom) {
		(0, _classCallCheck3.default)(this, SiteCreditVouchers);

		if (!sid) {
			throw new Error('`site id` is not correctly defined');
		}

		if (!(this instanceof SiteCreditVouchers)) {
			return new SiteCreditVouchers(sid, wpcom);
		}

		this.wpcom = wpcom;
		this._sid = sid;
		this.path = '/sites/' + this._sid + '/vouchers';
	}

	/**
  * Get site vouchers list
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(SiteCreditVouchers, [{
		key: 'list',
		value: function list() {
			var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var fn = arguments[1];

			query.apiNamespace = 'wpcom/v2';
			return this.wpcom.req.get(this.path, query, fn);
		}

		/**
   * Get site voucher
   *
   * @param {String} serviceType - service type
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'get',
		value: function get(serviceType) {
			var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var fn = arguments[2];

			query.apiNamespace = 'wpcom/v2';
			return this.wpcom.req.get(this.path + '/' + serviceType, query, fn);
		}

		/**
   * Assign a new voucher to the site
   *
   * @param {String} serviceType - service type
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'assign',
		value: function assign(serviceType) {
			var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var fn = arguments[2];

			query.apiNamespace = 'wpcom/v2';
			return this.wpcom.req.post(this.path + '/' + serviceType + '/assign', query, {}, fn);
		}
	}]);
	return SiteCreditVouchers;
}();

exports.default = SiteCreditVouchers;
module.exports = exports['default'];

//# sourceMappingURL=site.credit-vouchers.js.map