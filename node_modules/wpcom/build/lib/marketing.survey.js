'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module vars
 */
var root = '/marketing/survey';

var MarketingSurvey = function () {
	/**
  * `MarketingSurvey` constructor.
  *
  * @param {String} id - survey identification
  * @param {String} [siteId] - site identification
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */
	function MarketingSurvey(id, siteId, wpcom) {
		(0, _classCallCheck3.default)(this, MarketingSurvey);

		if (!id) {
			throw new TypeError('`id` survey is not correctly defined');
		}

		if (!(this instanceof MarketingSurvey)) {
			return new MarketingSurvey(id, siteId, wpcom);
		}

		if ((typeof siteId === 'undefined' ? 'undefined' : (0, _typeof3.default)(siteId)) === 'object') {
			this.wpcom = siteId;
		} else {
			this._siteId = siteId;
			this.wpcom = wpcom;
		}

		this._id = id;
		this._responses = {};
	}

	(0, _createClass3.default)(MarketingSurvey, [{
		key: 'setSiteId',
		value: function setSiteId(siteId) {
			this._siteId = siteId;
			return this;
		}
	}, {
		key: 'addResponse',
		value: function addResponse(key, value) {
			this._responses = (0, _assign2.default)({}, this._responses, (0, _defineProperty3.default)({}, key, value));
			return this;
		}
	}, {
		key: 'addResponses',
		value: function addResponses(responses) {
			this._responses = (0, _assign2.default)({}, this._responses, responses);
			return this;
		}

		/**
   * Submit a marketing survey.
   *
   * @param {Object} [query] - query object parameter
   * @param {Object} [body] - body object parameter
   * @param {Function} [fn] - callback function
   * @return {Promise} Promise
   */

	}, {
		key: 'submit',
		value: function submit() {
			var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var fn = arguments[2];

			body.survey_id = this._id;
			body.site_id = body.site_id || this._siteId;
			body.survey_responses = body.survey_responses || this._responses;
			return this.wpcom.req.post('' + root, query, body, fn);
		}
	}]);
	return MarketingSurvey;
}();

exports.default = MarketingSurvey;
module.exports = exports['default'];

//# sourceMappingURL=marketing.survey.js.map