'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Me;

var _me = require('./me.keyring-connection');

var _me2 = _interopRequireDefault(_me);

var _me3 = require('./me.connected-application');

var _me4 = _interopRequireDefault(_me3);

var _me5 = require('./me.publicize-connection');

var _me6 = _interopRequireDefault(_me5);

var _me7 = require('./me.settings');

var _me8 = _interopRequireDefault(_me7);

var _me9 = require('./me.two-step');

var _me10 = _interopRequireDefault(_me9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create `Me` instance
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
function Me(wpcom) {
  if (!(this instanceof Me)) {
    return new Me(wpcom);
  }

  this.wpcom = wpcom;
}

/**
 * Meta data about auth token's User
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
/**
 * Module dependencies
 */
Me.prototype.get = function (query, fn) {
  return this.wpcom.req.get('/me', query, fn);
};

/**
 * Get user billing history.
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} [fn] - callback function
 * @return {Function} request handler
 */
Me.prototype.billingHistory = function (query, fn) {
  return this.wpcom.req.get('/me/billing-history', query, fn);
};

/**
 * Get a list of posts of from the user's blogs
 *
 * *Example:*
 *    // Get posts list
 *    wpcom
 *    .me()
 *    .postsList( function( err, data ) {
 *      // posts list data object
 *    } );
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.postsList = function (query, fn) {
  return this.wpcom.req.get('/me/posts', query, fn);
};

/**
 * A list of the current user's sites
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.sites = function (query, fn) {
  return this.wpcom.req.get('/me/sites', query, fn);
};

/**
 * List the currently authorized user's likes
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.likes = function (query, fn) {
  return this.wpcom.req.get('/me/likes', query, fn);
};

/**
 * A list of the current user's group
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.groups = function (query, fn) {
  return this.wpcom.req.get('/me/groups', query, fn);
};

/**
 * Get current user's connected applications.
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.connectedApps = function (query, fn) {
  return this.wpcom.req.get('/me/connected-applications', query, fn);
};

/**
 * Get a list of all the keyring connections
 * associated with the current user
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.keyringConnections = function (query, fn) {
  return this.wpcom.req.get('/me/keyring-connections', query, fn);
};

/**
 * Get a list of publicize connections
 * that the current user has set up.
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Me.prototype.publicizeConnections = function (query, fn) {
  return this.wpcom.req.get('/me/publicize-connections', query, fn);
};

/**
 * Return a `MeSettings` instance.
 *
 * @return {MeSettings} MeSettings instance
 */
Me.prototype.settings = function () {
  return new _me8.default(this.wpcom);
};

/**
 * Return a `MeConnectedApp` instance.
 *
 * @param {String} id - app id
 * @return {ConnectedApp} Me ConnectedApp instance
 */
Me.prototype.connectedApp = function (id) {
  return new _me4.default(id, this.wpcom);
};

/**
 * Return a `MePublicizeConnection` instance.
 *
 * @param {String} id - connection id
 * @return {MePublicizeConnection} MeSettings instance
 */
Me.prototype.publicizeConnection = function (id) {
  return new _me6.default(id, this.wpcom);
};

/**
 * Return a `MeTwoStep` instance.
 *
 * @return {MeTwoStep} MeTwoStep instance
 */
Me.prototype.twoStep = function () {
  return new _me10.default(this.wpcom);
};

/**
 * Return a `MeKeyringConnection` instance.
 *
 * @param {String} id - connection id
 * @return {MeKeyringConnection} MeKeyringConnection instance
 */
Me.prototype.keyringConnection = function (id) {
  return new _me2.default(id, this.wpcom);
};
module.exports = exports['default'];

//# sourceMappingURL=me.js.map