'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = '/me/two-step/sms/';

var MeTwoStepSMS = function () {

	/**
  * `MeTwoStepSMS` constructor.
  *
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function MeTwoStepSMS(wpcom) {
		(0, _classCallCheck3.default)(this, MeTwoStepSMS);

		if (!(this instanceof MeTwoStepSMS)) {
			return new MeTwoStepSMS(wpcom);
		}
		this.wpcom = wpcom;
	}

	/**
  * Sends a two-step code via SMS to the current user.
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(MeTwoStepSMS, [{
		key: 'send',
		value: function send(query, fn) {
			return this.wpcom.req.post(root + 'new', query, fn);
		}
	}]);
	return MeTwoStepSMS;
}();

exports.default = MeTwoStepSMS;
module.exports = exports['default'];

//# sourceMappingURL=me.two-step.sms.js.map