'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = WPCOM;

var _wpcomXhrRequest = require('wpcom-xhr-request');

var _wpcomXhrRequest2 = _interopRequireDefault(_wpcomXhrRequest);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _batch = require('./lib/batch');

var _batch2 = _interopRequireDefault(_batch);

var _domain = require('./lib/domain');

var _domain2 = _interopRequireDefault(_domain);

var _domains = require('./lib/domains');

var _domains2 = _interopRequireDefault(_domains);

var _marketing = require('./lib/marketing');

var _marketing2 = _interopRequireDefault(_marketing);

var _me = require('./lib/me');

var _me2 = _interopRequireDefault(_me);

var _pinghub = require('./lib/util/pinghub');

var _pinghub2 = _interopRequireDefault(_pinghub);

var _plans = require('./lib/plans');

var _plans2 = _interopRequireDefault(_plans);

var _request = require('./lib/util/request');

var _request2 = _interopRequireDefault(_request);

var _site = require('./lib/site');

var _site2 = _interopRequireDefault(_site);

var _users = require('./lib/users');

var _users2 = _interopRequireDefault(_users);

var _sendRequest = require('./lib/util/send-request');

var _sendRequest2 = _interopRequireDefault(_sendRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Local module constants
 */
var debug = (0, _debug2.default)('wpcom');

/**
 * Local module dependencies.
 */
/**
 * Module dependencies.
 */

var DEFAULT_ASYNC_TIMEOUT = 30000;

/**
 * XMLHttpRequest (and CORS) API access method.
 *
 * API authentication is done via an (optional) access `token`,
 * which needs to be retrieved via OAuth.
 *
 * Request Handler is optional and XHR is defined as default.
 *
 * @param {String} [token] - OAuth API access token
 * @param {Function} [reqHandler] - function Request Handler
 * @return {WPCOM} wpcom instance
 */
function WPCOM(token, reqHandler) {
	if (!(this instanceof WPCOM)) {
		return new WPCOM(token, reqHandler);
	}

	// `token` is optional
	if ('function' === typeof token) {
		reqHandler = token;
		token = null;
	}

	if (token) {
		debug('Token defined: %s…', token.substring(0, 6));
		this.token = token;
	}

	// Set default request handler
	if (!reqHandler) {
		debug('No request handler. Adding default XHR request handler');

		this.request = function (params, fn) {
			params = params || {};

			// token is optional
			if (token) {
				params.authToken = token;
			}

			return (0, _wpcomXhrRequest2.default)(params, fn);
		};
	} else {
		this.request = reqHandler;
	}

	// Add Req instance
	this.req = new _request2.default(this);

	// Add Pinghub instance
	this.pinghub = new _pinghub2.default(this);

	// Default api version;
	this.apiVersion = '1.1';
}

/**
 * Return `Marketing` object instance
 *
 * @return {Marketing} Marketing instance
 */
WPCOM.prototype.marketing = function () {
	return new _marketing2.default(this);
};

/**
 * Return `Me` object instance
 *
 * @return {Me} Me instance
 */
WPCOM.prototype.me = function () {
	return new _me2.default(this);
};

/**
 * Return `Domains` object instance
 *
 * @return {Domains} Domains instance
 */
WPCOM.prototype.domains = function () {
	return new _domains2.default(this);
};

/**
 * Return `Domain` object instance
 *
 * @param {String} domainId - domain identifier
 * @return {Domain} Domain instance
 */
WPCOM.prototype.domain = function (domainId) {
	return new _domain2.default(domainId, this);
};

/**
 * Return `Site` object instance
 *
 * @param {String} id - site identifier
 * @return {Site} Site instance
 */
WPCOM.prototype.site = function (id) {
	return new _site2.default(id, this);
};

/**
 * Return `Users` object instance
 *
 * @return {Users} Users instance
 */
WPCOM.prototype.users = function () {
	return new _users2.default(this);
};

/**
 * Return `Plans` object instance
 *
 * @return {Plans} Plans instance
 */
WPCOM.prototype.plans = function () {
	return new _plans2.default(this);
};

/**
* Return `Batch` object instance
*
* @return {Batch} Batch instance
*/
WPCOM.prototype.batch = function () {
	return new _batch2.default(this);
};

/**
 * List Freshly Pressed Posts
 *
 * @param {Object} [query] - query object
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
WPCOM.prototype.freshlyPressed = function (query, fn) {
	return this.req.get('/freshly-pressed', query, fn);
};

/**
 * Expose send-request
 * @TODO: use `this.req` instead of this method
 */
WPCOM.prototype.sendRequest = function (params, query, body, fn) {
	var msg = 'WARN! Don use `sendRequest() anymore. Use `this.req` method.';

	if (console && console.warn) {
		console.warn(msg);
	} else {
		console.log(msg);
	}

	return _sendRequest2.default.call(this, params, query, body, fn);
};

/**
 * Re-export all the class types.
 */
WPCOM.Batch = _batch2.default;
WPCOM.Domain = _domain2.default;
WPCOM.Domains = _domains2.default;
WPCOM.Marketing = _marketing2.default;
WPCOM.Me = _me2.default;
WPCOM.Pinghub = _pinghub2.default;
WPCOM.Plans = _plans2.default;
WPCOM.Request = _request2.default;
WPCOM.Site = _site2.default;
WPCOM.Users = _users2.default;

if (!_promise2.default.prototype.timeout) {
	/**
 * Returns a new promise with a deadline
 *
 * After the timeout interval, the promise will
 * reject. If the actual promise settles before
 * the deadline, the timer is cancelled.
 *
 * @param {number} delay how many ms to wait
 * @return {Promise} promise
 */
	_promise2.default.prototype.timeout = function () {
		var _this = this;

		var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ASYNC_TIMEOUT;

		var cancelTimeout = void 0,
		    timer = void 0,
		    timeout = void 0;

		timeout = new _promise2.default(function (resolve, reject) {
			timer = setTimeout(function () {
				reject(new Error('Action timed out while waiting for response.'));
			}, delay);
		});

		cancelTimeout = function cancelTimeout() {
			clearTimeout(timer);
			return _this;
		};

		return _promise2.default.race([this.then(cancelTimeout).catch(cancelTimeout), timeout]);
	};
}
module.exports = exports['default'];

//# sourceMappingURL=index.js.map