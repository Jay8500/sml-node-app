'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _sitePost = require('./site.post.like');

var _sitePost2 = _interopRequireDefault(_sitePost);

var _sitePost3 = require('./site.post.reblog');

var _sitePost4 = _interopRequireDefault(_sitePost3);

var _site = require('./site.comment');

var _site2 = _interopRequireDefault(_site);

var _sitePost5 = require('./site.post.subscriber');

var _sitePost6 = _interopRequireDefault(_sitePost5);

var _runtimeBuilder = require('./util/runtime-builder');

var _runtimeBuilder2 = _interopRequireDefault(_runtimeBuilder);

var _sitePost7 = require('./runtime/site.post.get');

var _sitePost8 = _interopRequireDefault(_sitePost7);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module vars
 */
var debug = (0, _debug2.default)('wpcom:post'); /**
                                                 * Module dependencies.
                                                 */

var root = '/sites';

/**
 * SitePost class
 */

var SitePost = function () {
	/**
  * SitePost methods
  *
  * @param {String} id - post id
  * @param {String} sid site id
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function SitePost(id, sid, wpcom) {
		(0, _classCallCheck3.default)(this, SitePost);

		if (!(this instanceof SitePost)) {
			return new SitePost(id, sid, wpcom);
		}

		this.wpcom = wpcom;
		this._sid = sid;
		this.path = root + '/' + this._sid + '/posts';

		// set `id` and/or `slug` properties
		id = id || {};
		if ('object' !== (typeof id === 'undefined' ? 'undefined' : (0, _typeof3.default)(id))) {
			this._id = id;
		} else {
			this._id = id.id;
			this._slug = id.slug;
		}
	}

	/**
  * Set post `id`
  *
  * @param {String} id - site id
  */


	(0, _createClass3.default)(SitePost, [{
		key: 'id',
		value: function id(_id) {
			this._id = _id;
		}

		/**
   * Set post `slug`
   *
   * @param {String} slug - site slug
   */

	}, {
		key: 'slug',
		value: function slug(_slug) {
			this._slug = _slug;
		}

		/**
   * Get post url path
   *
   * @return {String} post path
   */

	}, {
		key: 'getPostPath',
		value: function getPostPath() {
			return this.path + '/' + this._id;
		}

		/**
   * Get post
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'get',
		value: function get(query, fn) {
			if (!this._id && this._slug) {
				return this.getBySlug(query, fn);
			}

			return this.wpcom.req.get(this.getPostPath(), query, fn);
		}

		/**
   * Get post by slug
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'getBySlug',
		value: function getBySlug(query, fn) {
			return this.wpcom.req.get(this.path + '/slug:' + this._slug, query, fn);
		}

		/**
   * Add post
   *
   * @param {Object} [query] - query object parameter
   * @param {Object} body - body object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'add',
		value: function add(query, body, fn) {
			var _this = this;

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

			return this.wpcom.req.post(this.path + '/new', query, body).then(function (data) {
				// update POST object
				_this._id = data.ID;
				debug('Set post _id: %s', _this._id);

				_this._slug = data.slug;
				debug('Set post _slug: %s', _this._slug);

				if ('function' === typeof fn) {
					fn(null, data);
				} else {
					return _promise2.default.resolve(data);
				}
			}).catch(function (err) {
				if ('function' === typeof fn) {
					fn(err);
				} else {
					return _promise2.default.reject(err);
				}
			});
		}

		/**
   * Edit post
   *
   * @param {Object} [query] - query object parameter
   * @param {Object} body - body object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'update',
		value: function update(query, body, fn) {
			return this.wpcom.req.put(this.getPostPath(), query, body, fn);
		}

		/**
   * Delete post
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Promise} Promise
   */

	}, {
		key: 'delete',
		value: function _delete(query, fn) {
			var path = this.getPostPath() + '/delete';
			return this.wpcom.req.del(path, query, fn);
		}

		/**
   * Del post, alias of Delete
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Promise} Promise
   */

	}, {
		key: 'del',
		value: function del(query, fn) {
			return this.delete(query, fn);
		}

		/**
   * Restore post
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'restore',
		value: function restore(query, fn) {
			return this.wpcom.req.put(this.getPostPath() + '/restore', query, null, fn);
		}

		/**
   * Search within a site for related posts
   *
   * @param {Object} body - body object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'related',
		value: function related(body, fn) {
			return this.wpcom.req.put(this.getPostPath() + '/related', body, null, fn);
		}

		/**
   * Create a `Comment` instance
   *
   * @param {String} [cid] - comment id
   * @return {Comment} Comment instance
   */

	}, {
		key: 'comment',
		value: function comment(cid) {
			return new _site2.default(cid, this._id, this._sid, this.wpcom);
		}

		/**
   * Return recent comments
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'comments',
		value: function comments(query, fn) {
			var comment = new _site2.default(null, this._id, this._sid, this.wpcom);
			return comment.replies(query, fn);
		}

		/**
   * Create a `Like` instance
   *
   * @return {Like} Like instance
   */

	}, {
		key: 'like',
		value: function like() {
			return new _sitePost2.default(this._id, this._sid, this.wpcom);
		}

		/**
   * Create a `Reblog` instance
   *
   * @return {Reblog} Reblog instance
   */

	}, {
		key: 'reblog',
		value: function reblog() {
			return new _sitePost4.default(this._id, this._sid, this.wpcom);
		}

		/**
   * Return a `Subscriber` instance.
   *
   * *Example:*
   *    // Create a Subscriber instance of a post
   *    var post = wpcom.site( 'en.blog.wordpress.com' ).post( 1234 );
   *    var subs = post.subscriber();
   *
   * @return {Subscriber} Subscriber instance
   */

	}, {
		key: 'subscriber',
		value: function subscriber() {
			return new _sitePost6.default(this._id, this._sid, this.wpcom);
		}
	}]);
	return SitePost;
}();

// add methods in runtime


(0, _runtimeBuilder2.default)(SitePost, _sitePost8.default, function (item, ctx) {
	return '/sites/' + ctx._sid + '/posts/' + ctx._id + '/' + item.subpath;
});

exports.default = SitePost;
module.exports = exports['default'];

//# sourceMappingURL=site.post.js.map