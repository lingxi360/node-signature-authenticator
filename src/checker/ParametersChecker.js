'use strict';

module.exports = {
    check: function (parameters) {
        if (! parameters.stamp || ! parameters.signature || ! parameters.noncestr) {
            return false;
        }

        return true;
    }
}
