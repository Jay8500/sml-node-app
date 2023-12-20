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

var SiteWPComPlugin = function () {

	/**
  * `SiteWPComPlugin` constructor.
  *
  * @param {String} [slug] - the plugin slug
  * @param {Number|String} sid - site identifier
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */
	function SiteWPComPlugin(slug, sid, wpcom) {
		(0, _classCallCheck3.default)(this, SiteWPComPlugin);

		if (!(this instanceof SiteWPComPlugin)) {
			return new SiteWPComPlugin(slug, sid, wpcom);
		}

		if (!slug) {
			throw new Error('`slug` is not correctly defined');
		}

		this._slug = encodeURIComponent(slug);
		this._sid = sid;
		this.wpcom = wpcom;

		var path = root + '/' + this._sid + '/wpcom-plugins';
		this.pluginPath = path + '/' + this._slug;
	}

	/**
  * Update the plugin configuration
  *
  * @param {Object} [query] - query object parameter
  * @param {Object} body - plugin body object
  * @param {Function} [fn] - callback function
  * @return {Promise} Promise
  */


	(0, _createClass3.default)(SiteWPComPlugin, [{
		key: 'update',
		value: function update(query, body, fn) {
			return this.wpcom.req.put(this.pluginPath, query, body, fn);
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
	}]);
	return SiteWPComPlugin;
}();

/**
 * Expose `SiteWPComPlugin` module
 */


exports.default = SiteWPComPlugin;
module.exports = exports['default'];

//# sourceMappingURL=site.wpcom-plugin.js.map