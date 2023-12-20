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

var SitePlugin = function () {

	/**
  * `SitePlugin` constructor.
  *
  * @param {String} [slug] - the plugin slug
  * @param {Number|String} sid - site identifier
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */
	function SitePlugin(slug, sid, wpcom) {
		(0, _classCallCheck3.default)(this, SitePlugin);

		if (!(this instanceof SitePlugin)) {
			return new SitePlugin(slug, sid, wpcom);
		}

		if (!slug) {
			throw new Error('`slug` is not correctly defined');
		}

		this._slug = encodeURIComponent(slug);
		this._sid = sid;
		this.wpcom = wpcom;

		var path = root + '/' + this._sid + '/plugins';
		this.pluginPath = path + '/' + this._slug;
	}

	/**
  * Get informtion about the plugin
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} [fn] - callback function
  * @return {Promise} Promise
  */


	(0, _createClass3.default)(SitePlugin, [{
		key: 'get',
		value: function get(query, fn) {
			return this.wpcom.req.get(this.pluginPath, query, fn);
		}

		/**
   * Update the plugin configuration
   *
   * @param {Object} [query] - query object parameter
   * @param {Object} body - plugin body object
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */

	}, {
		key: 'update',
		value: function update(query, body, fn) {
			return this.wpcom.req.put(this.pluginPath, query, body, fn);
		}
	}, {
		key: 'updateVersion',


		/**
   * Update the plugin version
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */
		value: function updateVersion(query, fn) {
			return this.wpcom.req.put(this.pluginPath + '/update', query, fn);
		}
	}, {
		key: 'install',


		/**
   * Install the plugin
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */
		value: function install(query, fn) {
			return this.wpcom.req.put(this.pluginPath + '/install', query, fn);
		}
	}, {
		key: 'delete',


		/**
   * Delete the plugin
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */
		value: function _delete(query, fn) {
			return this.wpcom.req.put(this.pluginPath + '/delete', query, fn);
		}
	}, {
		key: 'activate',


		/**
   * Activate the plugin
   * This method is a shorthand of update()
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */
		value: function activate(query, fn) {
			return this.update(query, { active: true }, fn);
		}
	}, {
		key: 'deactivate',


		/**
   * Deactivate the plugin
   * This method is a shorthand of update()
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */
		value: function deactivate(query, fn) {
			return this.update(query, { active: false }, fn);
		}

		/**
   * Enable plugin autoupdate
   * This method is a shorthand of update()
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */

	}, {
		key: 'enableAutoupdate',
		value: function enableAutoupdate(query, fn) {
			return this.update(query, { autoupdate: true }, fn);
		}

		/**
   * Disable plugin autoupdate
   * This method is a shorthand of update()
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */

	}, {
		key: 'disableAutoupdate',
		value: function disableAutoupdate(query, fn) {
			return this.update(query, { autoupdate: false }, fn);
		}
	}]);
	return SitePlugin;
}();

/**
 * Expose `SitePlugin` module
 */


exports.default = SitePlugin;
module.exports = exports['default'];

//# sourceMappingURL=site.plugin.js.map