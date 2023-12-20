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
 * SitePostType class
 */
var SitePostType = function () {
	/**
  * Create a SitePostType instance
  *
  * @param {String} postType - post type
  * @param {String} siteId - site id
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function SitePostType(postType, siteId, wpcom) {
		(0, _classCallCheck3.default)(this, SitePostType);

		if (!siteId) {
			throw new TypeError('`siteId` is not correctly defined');
		}

		if (!postType) {
			throw new TypeError('`postType` is not correctly defined');
		}

		if (!(this instanceof SitePostType)) {
			return new SitePostType(postType, siteId, wpcom);
		}

		this.wpcom = wpcom;

		this._siteId = encodeURIComponent(siteId);
		this._postType = encodeURIComponent(postType);
		this._rootPath = '/sites/' + this._siteId + '/post-types/' + this._postType;
	}

	/**
  * Get a list of taxonomies for the post type
  *
  * @param {Object} query - query object
  * @param {Function} fn - callback function
  * @return {Promise} Promise
  */


	(0, _createClass3.default)(SitePostType, [{
		key: 'taxonomiesList',
		value: function taxonomiesList(query, fn) {
			var termsPath = this._rootPath + '/taxonomies';
			return this.wpcom.req.get(termsPath, query, fn);
		}
	}]);
	return SitePostType;
}();

exports.default = SitePostType;
module.exports = exports['default'];

//# sourceMappingURL=site.post-type.js.map