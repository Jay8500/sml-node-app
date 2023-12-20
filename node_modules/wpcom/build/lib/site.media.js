'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Media;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fs = require('./util/fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module dependencies.
 */
var debug = (0, _debug2.default)('wpcom:media');

/**
 * Build a formData object to be sent in a POST request
 *
 * @param  {Array|File} files - array of files
 * @return {Array} formData array
 */
function buildFormData(files) {
	var formData = [];
	var isArray = Array.isArray(files);
	files = isArray ? files : [files];

	var i = void 0,
	    f = void 0,
	    k = void 0,
	    param = void 0;
	for (i = 0; i < files.length; i++) {
		f = files[i];

		if ('string' === typeof f) {
			f = (0, _fs.createReadStream)(f);
		}

		var isStream = !!f._readableState;
		var isFile = 'undefined' !== typeof File && f instanceof File;

		debug('isStream: %s', isStream);
		debug('isFile: %s', isFile);

		if (!isFile && !isStream) {
			// process file attributes like as `title`, `description`, ...
			for (k in f) {
				debug('add %o => %o', k, f[k]);
				if ('file' !== k) {
					param = 'attrs[' + i + '][' + k + ']';
					formData.push([param, f[k]]);
				}
			}
			// set file path
			f = f.file;
			if ('string' === typeof f) {
				f = (0, _fs.createReadStream)(f);
			}
		}

		formData.push(['media[]', f]);
	}

	return formData;
}

/**
 * Media methods
 *
 * @param {String} id - media id
 * @param {String} sid site id
 * @param {WPCOM} wpcom - wpcom instance
 * @return {Null} null
 */
function Media(id, sid, wpcom) {
	if (!(this instanceof Media)) {
		return new Media(id, sid, wpcom);
	}

	this.wpcom = wpcom;
	this._sid = sid;
	this._id = id;

	if (!this._id) {
		debug('WARN: media `id` is not defined');
	}
}

/**
 * Get media
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.get = function () {
	var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var fn = arguments[1];

	query.apiVersion = query.apiVersion || '1.2';
	var path = '/sites/' + this._sid + '/media/' + this._id;
	return this.wpcom.req.get(path, query, fn);
};

/**
 * Update media
 *
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.update = function (query, body, fn) {
	var params = { path: '/sites/' + this._sid + '/media/' + this._id };
	return this.wpcom.req.put(params, query, body, fn);
};

/**
 * Edit media
 *
 * @param {Object} [query] - query object parameter
 * @param {Object} body - body object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.edit = function (query, body, fn) {
	if (typeof body == 'function' || !body) {
		fn = body;
		body = query;
		query = {};
	}

	var params = { path: '/sites/' + this._sid + '/media/' + this._id + '/edit' };

	if (body && body.media) {
		params.formData = [['media', body.media]];
		delete body.media;

		for (var k in body) {
			params.formData.push(['attrs[' + k + ']', body[k]]);
		}

		body = null;
	}

	return this.wpcom.req.put(params, query, body, fn);
};

/**
 * Add media file
 *
 * @param {Object} [query] - query object parameter
 * @param {String|Object|Array} files - files to add
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.addFiles = function (query, files, fn) {
	if (undefined === fn) {
		if (undefined === files) {
			files = query;
			query = {};
		} else if ('function' === typeof files) {
			fn = files;
			files = query;
			query = {};
		}
	}

	var params = {
		path: '/sites/' + this._sid + '/media/new',
		formData: buildFormData(files)
	};

	return this.wpcom.req.post(params, query, null, fn);
};

/**
 * Add media files from URL
 *
 * @param {Object} [query] - query object parameter
 * @param {String|Array|Object} media - files to add
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.addUrls = function (query, media, fn) {
	if (undefined === fn) {
		if (undefined === media) {
			media = query;
			query = {};
		} else if ('function' === typeof media) {
			fn = media;
			media = query;
			query = {};
		}
	}

	var path = '/sites/' + this._sid + '/media/new';
	var body = { media_urls: [] };

	// process formData
	var i = void 0,
	    m = void 0,
	    url = void 0,
	    k = void 0;

	media = Array.isArray(media) ? media : [media];
	for (i = 0; i < media.length; i++) {
		m = media[i];

		if ('string' === typeof m) {
			url = m;
		} else {
			if (!body.attrs) {
				body.attrs = [];
			}

			// add attributes
			body.attrs[i] = {};
			for (k in m) {
				if ('url' !== k) {
					body.attrs[i][k] = m[k];
				}
			}
			url = m.url;
		}

		// push url into [media_url]
		body.media_urls.push(url);
	}

	return this.wpcom.req.post(path, query, body, fn);
};

/**
 * Delete media
 *
 * @param {Object} [query] - query object parameter
 * @param {Function} fn - callback function
 * @return {Function} request handler
 */
Media.prototype.delete = Media.prototype.del = function (query, fn) {
	var path = '/sites/' + this._sid + '/media/' + this._id + '/delete';
	return this.wpcom.req.del(path, query, fn);
};
module.exports = exports['default'];

//# sourceMappingURL=site.media.js.map