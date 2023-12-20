'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Req;

var _sendRequest = require('./send-request');

var _sendRequest2 = _interopRequireDefault(_sendRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Expose `Request` module
 * @param {WPCOM} wpcom - wpcom instance
 */
function Req(wpcom) {
	this.wpcom = wpcom;
}

/**
 * Request methods
 *
 * @param {Object|String} params - params object
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
/**
 * Module dependencies.
 */
Req.prototype.get = function (params, query, fn) {
	// `query` is optional
	if ('function' === typeof query) {
		fn = query;
		query = {};
	}

	return _sendRequest2.default.call(this.wpcom, params, query, null, fn);
};

/**
 * Make `update` request
 *
 * @param {Object|String} params
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 */
Req.prototype.post = Req.prototype.put = function (params, query, body, fn) {
	if (undefined === fn) {
		if (undefined === body) {
			body = query;
			query = {};
		} else if ('function' === typeof body) {
			fn = body;
			body = query;
			query = {};
		}
	}

	// params can be a string
	params = 'string' === typeof params ? { path: params } : params;

	// request method
	params.method = 'post';

	return _sendRequest2.default.call(this.wpcom, params, query, body, fn);
};

/**
 * Make a `delete` request
 *
 * @param {Object|String} params - params object
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Req.prototype.del = function (params, query, fn) {
	if ('function' === typeof query) {
		fn = query;
		query = {};
	}

	return this.post(params, query, null, fn);
};
module.exports = exports['default'];

//# sourceMappingURL=request.js.map