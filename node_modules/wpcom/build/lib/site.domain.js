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
 * Module vars
 */
var root = '/sites';

var SiteDomain = function () {
	/**
  * `SiteDomain` constructor.
  *
  * @param {Number|String} id - site identifier
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */
	function SiteDomain(id, wpcom) {
		(0, _classCallCheck3.default)(this, SiteDomain);

		if (!(this instanceof SiteDomain)) {
			return new SiteDomain(id, wpcom);
		}
		this._sid = id;
		this.path = root + '/' + this._sid + '/domains';
		this.wpcom = wpcom;
	}

	/**
  * Get the primary domain for a site
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} [fn] - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(SiteDomain, [{
		key: 'getPrimary',
		value: function getPrimary(query, fn) {
			return this.wpcom.req.get(this.path + '/primary', query, fn);
		}

		/**
   * Set the primary domain for a site
   *
   * @param {String} domain - domain to set
   * @param {Function} [fn] - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'setPrimary',
		value: function setPrimary(domain, fn) {
			return this.wpcom.req.put(this.path + '/primary', {}, { domain: domain }, fn);
		}

		/**
   * Get the redirect status for a site
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'getRedirect',
		value: function getRedirect(query, fn) {
			return this.wpcom.req.get(this.path + '/redirect', query, fn);
		}

		/**
   * Set the redirect location for a site
   *
   * @param {String|Object} location - location to set
   * @param {Function} [fn] - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'setRedirect',
		value: function setRedirect(location, fn) {
			if (typeof location === 'string') {
				location = { location: location };
			}

			return this.wpcom.req.put(this.path + '/redirect', {}, location, fn);
		}
	}]);
	return SiteDomain;
}();

/**
 * Expose `SiteDomain` module
 */


exports.default = SiteDomain;
module.exports = exports['default'];

//# sourceMappingURL=site.domain.js.map