'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = '/plans';

var Plans = function () {
	/**
  * `Plans` constructor.
  *
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */
	function Plans(wpcom) {
		(0, _classCallCheck3.default)(this, Plans);

		if (!(this instanceof Plans)) {
			return new Plans(wpcom);
		}
		this.wpcom = wpcom;
	}

	/**
  * Get a list of active WordPress.com plans
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} [fn] - callback function
  * @return {Promise} Promise
  */


	(0, _createClass3.default)(Plans, [{
		key: 'list',
		value: function list(query, fn) {
			return this.wpcom.req.get(root, query, fn);
		}

		/**
   * Get a list of features for active WordPress.com plans
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */

	}, {
		key: 'features',
		value: function features(query, fn) {
			return this.wpcom.req.get(root + '/features', query, fn);
		}
	}]);
	return Plans;
}();

exports.default = Plans;
module.exports = exports['default'];

//# sourceMappingURL=plans.js.map