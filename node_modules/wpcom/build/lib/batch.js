'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Batch = function () {
	/**
  * Create a `Batch` instance
  *
  * @param {WPCOM} wpcom - wpcom instance
  * @return {null} null
  */
	function Batch(wpcom) {
		(0, _classCallCheck3.default)(this, Batch);

		if (!(this instanceof Batch)) {
			return new Batch(wpcom);
		}

		this.wpcom = wpcom;
		this.urls = [];
	}

	/**
  * Add url to batch requests
  *
  * @param {String} url - endpoint url
  * @return {Batch} batch instance
  */


	(0, _createClass3.default)(Batch, [{
		key: 'add',
		value: function add(url) {
			this.urls.push(url);
			return this;
		}

		/**
   * Run the batch request
   *
   * @param {Object} [query] - optional query parameter
   * @param {Function} fn - callback
   * @return {Promise} Promise
   */

	}, {
		key: 'run',
		value: function run() {
			var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var fn = arguments[1];

			if ('function' === typeof query) {
				fn = query;
				query = {};
			}

			// add urls to query object
			query.urls = this.urls;

			return this.wpcom.req.get('/batch', query, fn);
		}
	}]);
	return Batch;
}();

;

/**
 * Expose `Batch` module
 */
exports.default = Batch;
module.exports = exports['default'];

//# sourceMappingURL=batch.js.map