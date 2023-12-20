'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = '/domains/';

var DomainEmail = function () {
	/**
  * `DomainEmail` constructor.
  *
  * @param {String} [email] - email
  * @param {String} domainId - domain identifier
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */
	function DomainEmail(email, domainId, wpcom) {
		(0, _classCallCheck3.default)(this, DomainEmail);

		if (!(this instanceof DomainEmail)) {
			return new DomainEmail(email, domainId, wpcom);
		}

		if (email) {
			this._email = email;
		}

		this._domain = domainId;
		this._subpath = root + this._domain + '/email/';
		this.wpcom = wpcom;
	}

	/**
  * Update the email forwards/configuration for a domain.
  *
  * @param {String} destination - the email address to forward email to.
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(DomainEmail, [{
		key: 'forward',
		value: function forward(destination, query, fn) {
			var body = { destination: destination };
			return this.wpcom.req.post(this._subpath + this._email, query, body, fn);
		}

		/**
   * Create an email forward for the domain
   * if it has enough licenses.
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'add',
		value: function add(mailbox, destination, query, fn) {
			if ('function' === typeof query) {
				fn = query;
				query = {};
			}

			var body = {
				mailbox: mailbox,
				destination: destination
			};

			return this.wpcom.req.post(this._subpath + 'new', query, body, fn);
		}

		/**
   * Delete an email forward for the domain
   *
   * @param {String} mailbox - mailbox to alter
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'delete',
		value: function _delete(mailbox, query, fn) {
			return this.wpcom.req.del(this._subpath + mailbox + '/delete', query, fn);
		}
	}]);
	return DomainEmail;
}();

/**
 * Expose `DomainEmail` module
 */


exports.default = DomainEmail;
module.exports = exports['default'];

//# sourceMappingURL=domain.email.js.map