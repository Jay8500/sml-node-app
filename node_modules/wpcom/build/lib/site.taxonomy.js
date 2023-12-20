'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _siteTaxonomy = require('./site.taxonomy.term');

var _siteTaxonomy2 = _interopRequireDefault(_siteTaxonomy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SiteTaxonomy class
 */
var SiteTaxonomy = function () {
	/**
  * Create a SiteTaxonomy instance
  *
  * @param {String} taxonomy - taxonomy type
  * @param {String} siteId - site id
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function SiteTaxonomy(taxonomy, siteId, wpcom) {
		(0, _classCallCheck3.default)(this, SiteTaxonomy);

		if (!siteId) {
			throw new TypeError('`siteId` is not correctly defined');
		}

		if (!taxonomy) {
			throw new TypeError('`taxonomy` is not correctly defined');
		}

		if (!(this instanceof SiteTaxonomy)) {
			return new SiteTaxonomy(taxonomy, siteId, wpcom);
		}

		this.wpcom = wpcom;

		this._siteId = encodeURIComponent(siteId);
		this._taxonomy = encodeURIComponent(taxonomy);
		this._rootPath = '/sites/' + this._siteId + '/taxonomies/' + this._taxonomy;
	}

	/**
  * Get a list of Terms for the Taxonomy
  *
  * @param {Object} [query] - query object
 	 * @param {Function} fn - callback function
 	 * @return {Promise} Promise
 	 */


	(0, _createClass3.default)(SiteTaxonomy, [{
		key: 'termsList',
		value: function termsList(query, fn) {
			var termsPath = this._rootPath + '/terms';
			return this.wpcom.req.get(termsPath, query, fn);
		}

		/**
   * Return `Term` instance
   *
   * @param {String} [term] - term slug
   * @return {Term} Term instance
   */

	}, {
		key: 'term',
		value: function term(_term) {
			return new _siteTaxonomy2.default(_term, this._taxonomy, this._siteId, this.wpcom);
		}
	}]);
	return SiteTaxonomy;
}(); /**
      * Module dependencies.
      */


exports.default = SiteTaxonomy;
module.exports = exports['default'];

//# sourceMappingURL=site.taxonomy.js.map