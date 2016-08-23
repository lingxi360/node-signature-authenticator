'use strict';

const qs = require('querystring');
const encrypt = require('./utils/encrypt');
const naturalSort = require('./utils/naturalSort');

const TimestampChecker = require('./checker/TimestampChecker');
const ParametersChecker = require('./checker/ParametersChecker');
const SignatureValueChecker = require('./checker/SignatureValueChecker');

var Authenticator = function (api_key, api_secret) {
    var handleAllSignatureParamaters = function (parameters) {
        // filter
        var handledData = [];
        for (var key in parameters) {
            if (! (key === 'signature' || parameters[key] === '')) {
                handledData[key.toLowerCase()] = parameters[key];
            }
        }
        // sort
        var result = {};
        var keys = Object.keys(handledData).sort(naturalSort);
        for (var i = 0, length = keys.length; i < length; i ++) {
            result[keys[i]] = handledData[keys[i]];
        }

        return result;
    }

    var getSignatureValue = function (parameters) {
        var parametersString = decodeURIComponent(qs.stringify(handleAllSignatureParamaters(parameters)));

        return encrypt(parametersString, api_secret);
    }

    var getAuthParameters = function (parameters) {
        parameters['stamp'] = new Date().getTime();
        parameters['noncestr'] = Math.random().toString(22).substr(2, 16);
        parameters['api_key'] = api_key;
        parameters['signature'] = getSignatureValue(parameters);

        return parameters;
    }

    return {
        attempt: function (parameters) {
            if (ParametersChecker.check(parameters) &&
                TimestampChecker.check(parameters.stamp) &&
                SignatureValueChecker.check(parameters.signature, getSignatureValue(parameters))
            )　{
                return true;
            }

            return false;
        },

        getValidUrl: function (url, parameters) {
            if (parameters === undefined) {
                parameters = {};
            }

            if (! url.endsWith('?')) {
                url += '?';
            }

            return url + qs.stringify(getAuthParameters(parameters));
        },

        getAuthParameters: function (parameters) {
            return getAuthParameters(parameters);
        }
    }
}

module.exports = Authenticator;
