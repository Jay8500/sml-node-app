'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SiteWordAds;

var _siteWordads = require('./site.wordads.settings');

var _siteWordads2 = _interopRequireDefault(_siteWordads);

var _siteWordads3 = require('./site.wordads.earnings');

var _siteWordads4 = _interopRequireDefault(_siteWordads3);

var _siteWordads5 = require('./site.wordads.tos');

var _siteWordads6 = _interopRequireDefault(_siteWordads5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `SiteWordAds` constructor.
 *
 * Use a `WPCOM#Me` instance to create a new `SiteWordAds` instance.
 *
 * @param {String} sid - site identifier
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
function SiteWordAds(sid, wpcom) {
  if (!(this instanceof SiteWordAds)) {
    return new SiteWordAds(sid, wpcom);
  }

  this._sid = sid;
  this.wpcom = wpcom;
}

/**
 * Return a `SiteWordAdsSettings` instance.
 *
 * *Example:*
 *    // Create a SiteWordAdsSettings instance
 *
 *    var wordAds = wpcom
 *      .site( 'my-blog.wordpress.com' )
 *      .wordAds()
 *      .settings();
 *
 * @return {SiteWordAdsSettings} site WordAds settings instance
 */
/**
 * Module dependencies.
 */
SiteWordAds.prototype.settings = function () {
  return new _siteWordads2.default(this._sid, this.wpcom);
};

/**
 * Return a `SiteWordAdsEarnings` instance.
 *
 * *Example:*
 *    // Create a SiteWordAdsEarnings instance
 *
 *    var wordAds = wpcom
 *      .site( 'my-blog.wordpress.com' )
 *      .wordAds()
 *      .earnings();
 *
 * @return {SiteWordAdsEarnings} site WordAds earnings instance
 */
SiteWordAds.prototype.earnings = function () {
  return new _siteWordads4.default(this._sid, this.wpcom);
};

/**
 * Return a `SiteWordAdsTOS` instance.
 *
 * *Example:*
 *    // Create a SiteWordAdsTOS instance
 *
 *    var wordAds = wpcom
 *      .site( 'my-blog.wordpress.com' )
 *      .wordAds()
 *      .tos();
 *
 * Return  SiteWordAdsTOS object for the site.
 *
 * @return {SiteWordAdsTOS} site wordAds TOS instance
 */
SiteWordAds.prototype.tos = function () {
  return new _siteWordads6.default(this._sid, this.wpcom);
};
module.exports = exports['default'];

//# sourceMappingURL=site.wordads.js.map