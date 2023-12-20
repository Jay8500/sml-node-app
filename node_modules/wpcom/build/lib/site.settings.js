'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SiteSettings methods
 *
 * @param {String} sid - site id
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
var SiteSettings = function () {
	function SiteSettings(sid, wpcom) {
		(0, _classCallCheck3.default)(this, SiteSettings);

		if (!sid) {
			throw new Error('`site id` is not correctly defined');
		}

		if (!(this instanceof SiteSettings)) {
			return new SiteSettings(sid, wpcom);
		}

		this.wpcom = wpcom;
		this._sid = sid;
		this.path = '/sites/' + this._sid + '/settings';
	}

	/**
  * Get site-settings
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(SiteSettings, [{
		key: 'get',
		value: function get(query, fn) {
			return this.wpcom.req.get(this.path, query, fn);
		}

		/**
   * Get site-settings single option
   *
   * @param {String} option - option to ask
   * @param {Function} [fn] - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'getOption',
		value: function getOption(option) {
			var _this = this;

			var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			var query = { fields: 'settings' };
			return new _promise2.default(function (resolve, reject) {
				_this.wpcom.req.get(_this.path, query, function (err, data) {
					if (err) {
						fn(err);
						return reject(err);
					}

					if (!data) {
						fn();
						return resolve();
					}

					var settings = data.settings;

					if (settings && typeof settings[option] !== 'undefined') {
						fn(null, settings[option]);
						return resolve(settings[option]);
					}

					fn(null, data);
					return resolve(data);
				});
			});
		}

		/**
   * Update site-settings
   *
   * @param {Object} [query] - query object parameter
   * @param {Object} body - body object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'update',
		value: function update(query, body, fn) {
			return this.wpcom.req.put(this.path, query, body, fn);
		}

		/**
   * Set site-settings single option
   *
   * @param {String} option - option to set
   * @param {*} value - value to assing to the given option
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'setOption',
		value: function setOption(option, value, fn) {
			return this.wpcom.req.put(this.path, {}, (0, _defineProperty3.default)({}, option, value), fn);
		}
	}]);
	return SiteSettings;
}();

exports.default = SiteSettings;
module.exports = exports['default'];

//# sourceMappingURL=site.settings.js.map