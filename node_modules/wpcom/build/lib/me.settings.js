'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MeSettings;

var _meSettings = require('./me.settings.profile-links');

var _meSettings2 = _interopRequireDefault(_meSettings);

var _meSettings3 = require('./me.settings.password');

var _meSettings4 = _interopRequireDefault(_meSettings3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `MeSettings` constructor.
 *
 * Use a `WPCOM#Me` instance to create a new `MeSettings` instance.
 *
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
/**
 * Module dependencies
 */
function MeSettings(wpcom) {
  if (!(this instanceof MeSettings)) {
    return new MeSettings(wpcom);
  }

  this.wpcom = wpcom;
}

/**
 * Get settings for the current user.
 *
 * *Example:*
 *    // Get settings for the current user
 *    wpcom
 *    .me()
 *    .settings()
 *    .get( function( err, data ) {
 *      // user settings data object
 *    } );
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
MeSettings.prototype.get = function (query, fn) {
  return this.wpcom.req.get('/me/settings', query, fn);
};

/**
 * Update settings of the current user
 *
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
MeSettings.prototype.update = function (query, body, fn) {
  return this.wpcom.req.put('/me/settings/', query, body, fn);
};

/**
 * Return `MeProfileLinks` instance
 *
 * *Example:*
 *    // Create a MeProfileLinks instance
 *    var profile_links = wpcom.me().settings().profileLinks();
 *
 * @return {MeProfileLinks} MeProfileLinks instance
 */
MeSettings.prototype.profileLinks = function () {
  return new _meSettings2.default(this.wpcom);
};

/**
 * Return `MeSettingsPassword` instance
 *
 * @return {MeSettingsPassword} MeSettingsPassword instance
 */
MeSettings.prototype.password = function () {
  return new _meSettings4.default(this.wpcom);
};
module.exports = exports['default'];

//# sourceMappingURL=me.settings.js.map