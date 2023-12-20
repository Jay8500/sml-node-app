'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _marketing = require('./marketing.survey');

var _marketing2 = _interopRequireDefault(_marketing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Marketing = function () {
	/**
  * `Marketing` constructor.
  *
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */
	function Marketing(wpcom) {
		(0, _classCallCheck3.default)(this, Marketing);

		if (!(this instanceof Marketing)) {
			return new Marketing(wpcom);
		}
		this.wpcom = wpcom;
	}

	/**
  * Return `MarketingSurvey` object instance
  *
  * @param {String} id - survey idetification
  * @param {String} [siteId] - site identification
  * @return {MarketingSurvey} MarketingSurvey instance
  */


	(0, _createClass3.default)(Marketing, [{
		key: 'survey',
		value: function survey(id, siteId) {
			return new _marketing2.default(id, siteId, this.wpcom);
		}
	}]);
	return Marketing;
}(); /**
      * Local module dependencies.
      */


exports.default = Marketing;
module.exports = exports['default'];

//# sourceMappingURL=marketing.js.map