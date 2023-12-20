'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _domain = require('./domain.email');

var _domain2 = _interopRequireDefault(_domain);

var _domain3 = require('./domain.dns');

var _domain4 = _interopRequireDefault(_domain3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module dependencies
 */
var root = '/domains/';

var Domain = function () {
	/**
  * `Domain` constructor.
  *
  * @param {String} id - domain identifier
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */
	function Domain(id, wpcom) {
		(0, _classCallCheck3.default)(this, Domain);

		if (!(this instanceof Domain)) {
			return new Domain(id, wpcom);
		}
		this._id = id;
		this.wpcom = wpcom;
	}

	/**
  * Get the status of the domain
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(Domain, [{
		key: 'status',
		value: function status(query, fn) {
			return this.wpcom.req.get(root + this._id + '/status', query, fn);
		}

		/**
   * Check if the given domain is available
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'isAvailable',
		value: function isAvailable(query, fn) {
			return this.wpcom.req.get(root + this._id + '/is-available', query, fn);
		}

		/**
   * Check if the given domain name can be mapped to
   * a WordPress blog.
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'isMappable',
		value: function isMappable(query, fn) {
			return this.wpcom.req.get(root + this._id + '/is-mappable', query, fn);
		}

		/**
   * Check if the given domain name can be used for site redirect.
   *
   * @param {String} siteId - site id of the site to check
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'canRedirect',
		value: function canRedirect(siteId, query, fn) {
			var path = root + siteId + '/' + this._id + '/can-redirect';
			return this.wpcom.req.get(path, query, fn);
		}

		/**
   * Get the email forwards/configuration for a domain.
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'emailForwards',
		value: function emailForwards(query, fn) {
			return this.wpcom.req.get(root + this._id + '/email', query, fn);
		}

		/**
   * Get a list of the nameservers for the domain
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'nameserversList',
		value: function nameserversList(query, fn) {
			return this.wpcom.req.get(root + this._id + '/nameservers', query, fn);
		}

		/**
   * Update the nameservers for the domain
   *
   * @param {Array} nameservers- nameservers list
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'updateNameservers',
		value: function updateNameservers(nameservers, query, fn) {
			var body = { nameservers: nameservers };
			return this.wpcom.req.post(root + this._id + '/nameservers', query, body, fn);
		}

		/**
   * Get a list of the DNS records for the domain
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'dnsList',
		value: function dnsList(query, fn) {
			return this.wpcom.req.get(root + this._id + '/dns', query, fn);
		}

		/**
   * Get a list of all Google Apps accounts for the domain
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'googleAppsList',
		value: function googleAppsList(query, fn) {
			return this.wpcom.req.get(root + this._id + '/google-apps', query, fn);
		}

		/**
   * Resend the ICANN verification email for the domain
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'resendICANN',
		value: function resendICANN(query, fn) {
			return this.wpcom.req.post(root + this._id + '/resend-icann', query, fn);
		}

		/**
   * Return `DomainEmail` instance
   *
   * @param {String} [email] - email identifier
   * @return {DomainEmail} DomainEmail instance
   */

	}, {
		key: 'email',
		value: function email(_email) {
			return new _domain2.default(_email, this._id, this.wpcom);
		}

		/**
   * Return `DomainDns` instance
   *
   * @return {DomainDns} DomainDns instance
   */

	}, {
		key: 'dns',
		value: function dns() {
			return new _domain4.default(this._id, this.wpcom);
		}
	}]);
	return Domain;
}();

/**
 * Expose `Domain` module
 */


exports.default = Domain;
module.exports = exports['default'];

//# sourceMappingURL=domain.js.map