'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Pinghub;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('wpcom:pinghub');

/**
 * Create a `Pinghub` instance
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @return {null} null
 * @api public
 */
/**
 * Module dependencies.
 */
function Pinghub(wpcom) {
	if (!(this instanceof Pinghub)) {
		return new Pinghub(wpcom);
	}

	this.wpcom = wpcom;
	this.conns = {};
}

/**
 * Open a websocket to Pinghub
 *
 * @param {String} path - request path
 * @param {Function} fn - callback function
 * @api public
 */
Pinghub.prototype.connect = function (path, fn) {
	debug('connect', path, fn);
	var pinghub = this,
	    params = {
		action: 'connect',
		path: '/pinghub' + path
	},
	    errorCallback = function errorCallback() {},
	    // we want an xhr, not a promise
	xhr = this.conns[path] = this.wpcom.req.get(params, errorCallback);
	xhr.onload = function (e) {
		debug('onload', path, e);
		fn(null, e);
	};
	xhr.onerror = xhr.onabort = xhr.onclose = function (e) {
		debug('onerror', path, e);
		pinghub.remove(path);
		fn(e, null);
	};
};

/**
 * Close a websocket connection (unsubscribe)
 *
 * @param {String} path - request path
 * @api public
 */
Pinghub.prototype.disconnect = function (path) {
	debug('disconnect', path);
	var params = {
		action: 'disconnect',
		path: '/pinghub' + path
	},
	    errorCallback = function errorCallback() {}; // no promises
	this.wpcom.req.get(params, errorCallback);
};

/**
 * Remove a dead connection
 *
 * @param {String} path - pinghub channel
 * @api private
 */
Pinghub.prototype.remove = function (path) {
	debug('remove', path);
	delete this.conns[path];
};
module.exports = exports['default'];

//# sourceMappingURL=pinghub.js.map