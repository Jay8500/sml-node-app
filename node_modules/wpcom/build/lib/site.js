'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _site = require('./site.category');

var _site2 = _interopRequireDefault(_site);

var _site3 = require('./site.comment');

var _site4 = _interopRequireDefault(_site3);

var _site5 = require('./site.follow');

var _site6 = _interopRequireDefault(_site5);

var _site7 = require('./site.media');

var _site8 = _interopRequireDefault(_site7);

var _site9 = require('./site.post');

var _site10 = _interopRequireDefault(_site9);

var _site11 = require('./site.tag');

var _site12 = _interopRequireDefault(_site11);

var _site13 = require('./site.post-type');

var _site14 = _interopRequireDefault(_site13);

var _site15 = require('./site.domain');

var _site16 = _interopRequireDefault(_site15);

var _site17 = require('./site.plugin');

var _site18 = _interopRequireDefault(_site17);

var _site19 = require('./site.settings');

var _site20 = _interopRequireDefault(_site19);

var _site21 = require('./site.taxonomy');

var _site22 = _interopRequireDefault(_site21);

var _site23 = require('./site.credit-vouchers');

var _site24 = _interopRequireDefault(_site23);

var _site25 = require('./site.wordads');

var _site26 = _interopRequireDefault(_site25);

var _site27 = require('./site.wpcom-plugin');

var _site28 = _interopRequireDefault(_site27);

var _site29 = require('./runtime/site.get');

var _site30 = _interopRequireDefault(_site29);

var _runtimeBuilder = require('./util/runtime-builder');

var _runtimeBuilder2 = _interopRequireDefault(_runtimeBuilder);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module vars
 */
var debug = (0, _debug2.default)('wpcom:site'); /**
                                                 * Module dependencies.
                                                 */

var root = '/sites';

/**
 * Site class
 */

var Site = function () {
	/**
  * Create a Site instance
  *
  * @param {String} id - site id
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function Site(id, wpcom) {
		(0, _classCallCheck3.default)(this, Site);

		if (!(this instanceof Site)) {
			return new Site(id, wpcom);
		}

		this.wpcom = wpcom;

		debug('set %o site id', id);
		this._id = encodeURIComponent(id);
		this.path = root + '/' + this._id;
	}

	/**
  * Require site information
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(Site, [{
		key: 'get',
		value: function get(query, fn) {
			return this.wpcom.req.get(this.path, query, fn);
		}

		/**
   * Create a `Post` instance
   *
   * @param {String} id - post id
   * @return {Post} Post instance
   */

	}, {
		key: 'post',
		value: function post(id) {
			return new _site10.default(id, this._id, this.wpcom);
		}

		/**
   * Add a new blog post
   *
   * @param {Object} body - body object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'addPost',
		value: function addPost(body, fn) {
			var post = new _site10.default(null, this._id, this.wpcom);
			return post.add(body, fn);
		}

		/**
   * Delete a blog post
   *
   * @param {String} id - post id
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'deletePost',
		value: function deletePost(id, fn) {
			var post = new _site10.default(id, this._id, this.wpcom);
			return post.delete(fn);
		}

		/**
   * Create a `Media` instance
   *
   * @param {String} id - post id
   * @return {Media} Media instance
   */

	}, {
		key: 'media',
		value: function media(id) {
			return new _site8.default(id, this._id, this.wpcom);
		}

		/**
   * Add a media from a file
   *
   * @param {Object} [query] - query object parameter
   * @param {Array|String} files - media files to add
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'addMediaFiles',
		value: function addMediaFiles(query, files, fn) {
			var media = new _site8.default(null, this._id, this.wpcom);
			return media.addFiles(query, files, fn);
		}

		/**
   * Add a new media from url
   *
   * @param {Object} [query] - query object parameter
   * @param {Array|String} files - media files to add
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'addMediaUrls',
		value: function addMediaUrls(query, files, fn) {
			var media = new _site8.default(null, this._id, this.wpcom);
			return media.addUrls(query, files, fn);
		}

		/**
   * Delete a blog media
   *
   * @param {String} id - media id
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'deleteMedia',
		value: function deleteMedia(id, fn) {
			var media = new _site8.default(id, this._id, this.wpcom);
			return media.del(fn);
		}

		/**
   * Create a `Comment` instance
   *
   * @param {String} id - comment id
   * @return {Comment} Comment instance
   */

	}, {
		key: 'comment',
		value: function comment(id) {
			return new _site4.default(id, null, this._id, this.wpcom);
		}

		/**
   * Create a `Follow` instance
   *
   * @return {Follow} Follow instance
   */

	}, {
		key: 'follow',
		value: function follow() {
			return new _site6.default(this._id, this.wpcom);
		}

		/**
   * Create a `SitePlugin` instance
   *
   * @param {String} slug - plugin identifier
   * @return {SitePlugin} SitePlugin instance
   */

	}, {
		key: 'plugin',
		value: function plugin(slug) {
			return new _site18.default(slug, this._id, this.wpcom);
		}

		/**
   * Create a `SiteWPComPlugin` instance
   *
   * @param {String} slug - plugin identifier
   * @return {SiteWPComPlugin} SiteWPComPlugin instance
   */

	}, {
		key: 'wpcomPlugin',
		value: function wpcomPlugin(slug) {
			return new _site28.default(slug, this._id, this.wpcom);
		}

		/**
   * Create a `Category` instance
   * Set `cat` alias
   *
   * @param {String} [slug] - category slug
   * @return {Category} Category instance
   */

	}, {
		key: 'category',
		value: function category(slug) {
			return new _site2.default(slug, this._id, this.wpcom);
		}

		/**
   * Create a `Tag` instance
   *
   * @param {String} [slug] - tag slug
   * @return {Tag} Tag instance
   */

	}, {
		key: 'tag',
		value: function tag(slug) {
			return new _site12.default(slug, this._id, this.wpcom);
		}

		/**
   * Create a `Taxonomy` instance
   *
   * @param {String} [slug] - taxonomy slug
   * @return {SiteTaxonomy} SiteTaxonomy instance
   */

	}, {
		key: 'taxonomy',
		value: function taxonomy(slug) {
			return new _site22.default(slug, this._id, this.wpcom);
		}

		/**
   * Create a `SiteCreditVouchers` instance
   *
   * @return {SiteCreditVouchers} SiteCreditVouchers instance
   */

	}, {
		key: 'creditVouchers',
		value: function creditVouchers() {
			return new _site24.default(this._id, this.wpcom);
		}

		/**
   * Create a `SitePostType` instance
   *
   * @param {String} [slug] - post type slug
   * @return {SitePostType} SitePostType instance
   */

	}, {
		key: 'postType',
		value: function postType(slug) {
			return new _site14.default(slug, this._id, this.wpcom);
		}

		/**
   * Create a `SiteSettings` instance
   *
   * @return {SiteSettings} SiteSettings instance
   */

	}, {
		key: 'settings',
		value: function settings() {
			return new _site20.default(this._id, this.wpcom);
		}

		/**
   * Create a `SiteDomain` instance
   *
   * @return {SiteDomain} SiteDomain instance
   */

	}, {
		key: 'domain',
		value: function domain() {
			return new _site16.default(this._id, this.wpcom);
		}

		/**
   * Get number of posts in the post type groups by post status
   *
   * *Example:*
   *   // Get number post of pages
   *    wpcom
   *    .site( 'my-blog.wordpress.com' )
   *    .postCounts( 'page', function( err, data ) {
   *      // `counts` data object
   *    } );
   *
   * @param {String} type - post type
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'postCounts',
		value: function postCounts() {
			var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'post';
			var query = arguments[1];
			var fn = arguments[2];

			if ('function' === typeof query) {
				fn = query;
				query = {};
			}

			return this.wpcom.req.get(this.path + '/post-counts/' + type, query, fn);
		}

		/**
   * Get a rendered shortcode for a site.
   *
   * Note: The current user must have publishing access.
   *
   * @param {String} url - shortcode url
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'renderShortcode',
		value: function renderShortcode(url, query, fn) {
			if ('string' !== typeof url) {
				throw new TypeError('expected a url String');
			}

			if ('function' === typeof query) {
				fn = query;
				query = {};
			}

			query = query || {};
			query.shortcode = url;

			return this.wpcom.req.get(this.path + '/shortcodes/render', query, fn);
		}

		/**
   * Get a rendered embed for a site.
   *
   * Note: The current user must have publishing access.
   *
   * @param {String} url - embed url
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'renderEmbed',
		value: function renderEmbed(url, query, fn) {
			if ('string' !== typeof url) {
				throw new TypeError('expected an embed String');
			}

			if ('function' === typeof query) {
				fn = query;
				query = {};
			}

			query = query || {};
			query.embed_url = url;

			return this.wpcom.req.get(this.path + '/embeds/render', query, fn);
		}

		/**
   * Mark a referrering domain as spam
   *
   * @param {String} domain - domain
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'statsReferrersSpamNew',
		value: function statsReferrersSpamNew(domain, fn) {
			var path = this.path + '/stats/referrers/spam/new';
			return this.wpcom.req.post(path, { domain: domain }, null, fn);
		}

		/**
   * Remove referrering domain from spam
   *
   * @param {String} domain - domain
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'statsReferrersSpamDelete',
		value: function statsReferrersSpamDelete(domain, fn) {
			var path = this.path + '/stats/referrers/spam/delete';
			return this.wpcom.req.post(path, { domain: domain }, null, fn);
		}

		/**
   * Get detailed stats about a VideoPress video
   *
   * @param {String} videoId - video id
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'statsVideo',
		value: function statsVideo(videoId, query, fn) {
			var path = this.path + '/stats/video/' + videoId;

			if ('function' === typeof query) {
				fn = query;
				query = {};
			}

			return this.wpcom.req.get(path, query, fn);
		}

		/**
   * Get detailed stats about a particular post
   *
   * @param {String} postId - post id
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'statsPostViews',
		value: function statsPostViews(postId, query, fn) {
			var path = this.path + '/stats/post/' + postId;

			if ('function' === typeof query) {
				fn = query;
				query = {};
			}

			return this.wpcom.req.get(path, query, fn);
		}

		/**
   * Return a `SiteWordAds` instance.
   *
   * *Example:*
   *    // Create a SiteWordAds instance
   *
   *    const wordAds = wpcom
   *      .site( 'my-blog.wordpress.com' )
   *      .wordAds();
   *
   * @return {SiteWordAds} SiteWordAds instance
   */

	}, {
		key: 'wordAds',
		value: function wordAds() {
			return new _site26.default(this._id, this.wpcom);
		}
	}]);
	return Site;
}();

// add methods in runtime


(0, _runtimeBuilder2.default)(Site, _site30.default, function (methodParams, ctx) {
	return '/sites/' + ctx._id + '/' + methodParams.subpath;
});

exports.default = Site;
module.exports = exports['default'];

//# sourceMappingURL=site.js.map