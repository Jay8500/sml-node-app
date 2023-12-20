'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = '/domains/';

var Domains = function () {
	/**
  * `Domains` constructor.
  *
  * @param {WPCOM} wpcom - wpcom instance
  * @return {Undefined} undefined
  */
	function Domains(wpcom) {
		(0, _classCallCheck3.default)(this, Domains);

		if (!(this instanceof Domains)) {
			return new Domains(wpcom);
		}
		this.wpcom = wpcom;
	}

	/**
  * Get a list of suggested domain names that are available for
  * registration based on a given term or domain name.
  *
  * @param {String|Object} [query] - query object parameter
  * @param {Function} fn - callback function
  * @return {Function} request handler
  */


	(0, _createClass3.default)(Domains, [{
		key: 'suggestions',
		value: function suggestions(query, fn) {
			if ('string' === typeof query) {
				query = { query: query };
			}
			return this.wpcom.req.get(root + 'suggestions', query, fn);
		}

		/**
   * GET example domain suggestions
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'suggestionsExamples',
		value: function suggestionsExamples(query, fn) {
			return this.wpcom.req.get(root + 'suggestions/examples', query, fn);
		}

		/**
   * Get a localized list of supported countries for domain registrations.
   *
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'supportedCountries',
		value: function supportedCountries(query, fn) {
			return this.wpcom.req.get(root + 'supported-countries', query, fn);
		}

		/**
   * Get a localized list of supported states for domain registrations.
   *
   * @param {String} countryCode - country code ISO 3166-1 alpha-2 identifier
   * @param {Object} [query] - query object parameter
   * @param {Function} fn - callback function
   * @return {Function} request handler
   */

	}, {
		key: 'supportedStates',
		value: function supportedStates(countryCode, query, fn) {
			var path = root + 'supported-states/' + countryCode;
			return this.wpcom.req.get(path, query, fn);
		}
	}]);
	return Domains;
}();

/**
* Expose `Domains` module
*/


exports.default = Domains;
module.exports = exports['default'];

//# sourceMappingURL=domains.js.map