'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SitePostSubscriber = function () {
	/**
  * `SitePostSubscriber` constructor.
  *
  * @param {String} id - post identifier
  * @param {String} sid - site identifier
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function SitePostSubscriber(id, sid, wpcom) {
		(0, _classCallCheck3.default)(this, SitePostSubscriber);

		if (!sid) {
			throw new Error('`side id` is not correctly defined');
		}

		if (!id) {
			throw new Error('`post id` is not correctly defined');
		}

		if (!(this instanceof SitePostSubscriber)) {
			return new SitePostSubscriber(id, sid, wpcom);
		}

		this.wpcom = wpcom;
		this._id = id;
		this._sid = sid;
		this.path = '/sites/' + this._sid + '/posts/' + this._id + '/subscribers';
	}

	/**
  * Get subscriber status for the current user for the Post.
  *
  *
  * *Example:*
  *    Get subscriber status for the current user for the Post
  *    wpcom
  *    .site( 'en.blog.wordpress.com' )
  *    .post( 1234 )
  *    .subscriber()
  *    .mine( function( err, data ) {
  *      // subscription data
  *    } );
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Promise} Promise
  */


	(0, _createClass3.default)(SitePostSubscriber, [{
		key: 'mine',
		value: function mine(query, fn) {
			return this.wpcom.req.get(this.path + '/mine', query, fn);
		}

		/**
   * Subscribe the current user to the post.
   *
   * *Example:*
   *    // Subscribe the current user to the post
   *    wpcom
   *    .site( 'en.blog.wordpress.com' )
   *    .post( 1234 )
   *    .subscriber()
   *    .add( function( err, data ) {
   *      // current user has been subscribed to post
   *    } );
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Promise} Promise
   */

	}, {
		key: 'add',
		value: function add(query, fn) {
			return this.wpcom.req.put(this.path + '/new', query, null, fn);
		}

		/**
   * Unsubscribe current user to the post
   *
   * *Example:*
   *    // Unsubscribe current user to the post
   *    wpcom
   *    .site( 'en.blog.wordpress.com' )
   *    .post( 1234 )
   *    .subscriber()
   *    .del( function( err, data ) {
   *      // current user has been unsubscribed to post
   *    } );
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Promise} Promise
   */

	}, {
		key: 'del',
		value: function del(query, fn) {
			return this.wpcom.req.del(this.path + '/mine/delete', query, fn);
		}
	}]);
	return SitePostSubscriber;
}();

// method alias


SitePostSubscriber.prototype.state = SitePostSubscriber.prototype.mine;
SitePostSubscriber.prototype.delete = SitePostSubscriber.prototype.del;

exports.default = SitePostSubscriber;
module.exports = exports['default'];

//# sourceMappingURL=site.post.subscriber.js.map