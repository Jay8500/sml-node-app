'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = '/me/settings/password/';

var MeSettingsPassword = function () {

	/**
  * `MeSettingsPassword` constructor.
  *
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Null} null
  */
	function MeSettingsPassword(wpcom) {
		(0, _classCallCheck3.default)(this, MeSettingsPassword);

		if (!(this instanceof MeSettingsPassword)) {
			return new MeSettingsPassword(wpcom);
		}
		this.wpcom = wpcom;
	}

	/**
  * Verify strength of a user's new password.
  *
  * @param {String} password - the users's potential new password
  * @param {Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(MeSettingsPassword, [{
		key: 'validate',
		value: function validate(password, query, fn) {
			return this.wpcom.req.post(root + 'validate', query, { password: password }, fn);
		}
	}]);
	return MeSettingsPassword;
}();

exports.default = MeSettingsPassword;
module.exports = exports['default'];

//# sourceMappingURL=me.settings.password.js.map