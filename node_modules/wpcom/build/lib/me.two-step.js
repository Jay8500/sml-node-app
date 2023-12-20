'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _meTwoStep = require('./me.two-step.sms');

var _meTwoStep2 = _interopRequireDefault(_meTwoStep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = '/me/two-step/'; /**
                             * Module dependencies
                             */

var MeTwoStep = function () {

	/**
  * `MeTwoStep` constructor.
  *
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function MeTwoStep(wpcom) {
		(0, _classCallCheck3.default)(this, MeTwoStep);

		if (!(this instanceof MeTwoStep)) {
			return new MeTwoStep(wpcom);
		}
		this.wpcom = wpcom;
	}

	/**
  * Get information about current user's two factor configuration.
  *
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(MeTwoStep, [{
		key: 'get',
		value: function get(query, fn) {
			return this.wpcom.req.get(root, query, fn);
		}

		/**
   * Return a `MeTwoStepSMS` instance.
   *
   * @return {MeTwoStepSMS} MeTwoStepSMS instance
   */

	}, {
		key: 'sms',
		value: function sms() {
			return new _meTwoStep2.default(this.wpcom);
		}
	}]);
	return MeTwoStep;
}();

exports.default = MeTwoStep;
module.exports = exports['default'];

//# sourceMappingURL=me.two-step.js.map